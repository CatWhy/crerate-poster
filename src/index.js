import { drawImage, drawFont, clipPreviousHandle } from "./utils/drawImage.js";

/**
 * @method ：
 * @param {object} config Poster Configuration information
 * @param {number} config.width  生成图片海报的宽度
 * @param {number} config.height  生成图片海报的高度
 * @param {number} config.scale  海报质量
 * @param {number} config.suffix  生成图片类型
 */
function createPoster(config, ele) {
    const instance = new poster(config);
    // console.log(instance, 'instance');
    return instance.outputImg(ele);
}
class poster {
    constructor(config = { width: 300, height: 700, suffix: 'jpeg', scale: 5 }) {
        this.suffixArray = ['png', 'webp', 'jpeg'];
        this.canvasConifg = config;
        this.ctx = null;
        this.canvas = null;
        this.scale = config.scale || 1;
        this.posterBase64 = null; // 海报最终是base64格式
        // 初始化canvas元素
        this.initCanvas(config.width, config.height);
    }

    // 初始化canvas元素
    initCanvas(width, height) {
        let canvas = document.createElement("canvas");
        this.canvas = canvas;
        canvas.style["position"] = "absolute";
        canvas.style["z-index"] = "-1";
        canvas.style["top"] = 0;
        canvas.style["left"] = 0;
        canvas.style["display"] = "none";
        canvas.width = width * this.scale;
        canvas.height = height * this.scale;
        document.body.appendChild(canvas);
        this.ctx = canvas.getContext("2d");
    }

    // 初始化/预加载图片
    initImage(ele) {
        const imagePromise = [];
        ele.filter((item, index) => {
            if (item.type == 'img') {
                const p = new Promise((res, rej) => {
                    let img = new Image();
                    img.crossOrigin = "anonymous";  // 请求头会包含Origin："anonymous",允许跨域.
                    img.src = ele[index].src;
                    // 必须要等图片加载完成之后才能进行绘制
                    img.onload = function () {
                        item.imgElement = img;
                        res(true);
                    };
                })
                imagePromise.push(p)
                return true
            }
        })
        return Promise.all(imagePromise);
    }

    // 
    draw(eleArray) {
        eleArray.forEach((element, index) => {
            if (element.type == 'img') {
                // 展示背景图
                drawImage(this.ctx, element, this.scale)
            } else if (element.type === 'custom') {
                // 展示自定义
                this.ctx.beginPath()
                clipPreviousHandle(this.ctx)
                element.callback(this.ctx)
            } else if (element.type === 'font') {
                // 展示文字
                drawFont(this.ctx, element, this.scale)
            }
        });
    }
    toConverImg() {
        let suffix = this.canvasConifg.suffix || 'jpeg';
        if (!this.suffixArray.includes(suffix)) {
            console.error("The image type can only be PNG, JPEG, or WebP");
            return;
        }
        /**
        * 可以得到以 base64 编码的image/${suffix} 图片
        * 1. 参数type指定图片类型，如果指定的类型不被支持则以默认值image/png替代；
        * 2. 为图片设置图片质量，取值0-1，超出则以默认值0.92替代。
        */
        return this.canvas.toDataURL(`image/${suffix}`, 1.0);
    }
    async outputImg(ele) {
        await this.initImage(ele);
        this.draw(ele);
        this.posterBase64 = this.toConverImg();
        return this.posterBase64
    }
}

export default createPoster;
window.createPoster = createPoster;