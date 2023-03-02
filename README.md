
### 引入:
```
npm install vue-create-poster --save
import createPoster from 'vue-create-poster';
```

### 介绍：
海报生成组件：
- 生成速度快于html2canvas
- 生成图片质量高于html2canvas
- 代码结构更简洁,代码量更小,不需要html元素和css
- 组件更小，只有4kb,远小于html2canvas的200kb


### 用法：
```
const config ={ width: 300, height: 700, suffix: 'jpeg', scale: 5 }
const posterElements = [
    {
        type: 'img',
        src: 'https://wechatapppro-1252524126.file.myqcloud.com/appAKLWLitn7978/image/a95789e8626cd3d428ecb85c823d525c.png',
        x: 0,
        y: 0,
        width: 250,
        height: 450,
    },
    {
        type: 'custom',
        callback: draw
    },
    {
        type: 'img',
        src: 'https://wechatapppro-1252524126.file.myqcloud.com/appAKLWLitn7978/image/b_u_5b2225aa46488_oGKN7IvA/ktb3nze709jx.jpeg?imageView2/2/w/640/h/480/q/100/format/webp',
        x: 10,
        y: 100,
        width: 230,
        height: 120
    },
    {
        type: 'font',
        x: 10,
        y: 20,
        value: '好好学习',
        size: 20
    }
]

// 自定义绘制函数
function draw(ctx) {
    ctx.moveTo(10, 10);
    ctx.lineTo(500, 500)
    ctx.stroke();
}

createPoster(conifg, posterElements).then(res => {
    img.src = res;
})
```

#### config参数说明：
|参数|描述|类型|可选值|默认值|
|:--|:--:|:--:|:--:|--:|
|width|海报展示的宽度|number| --| 300|
|height|海报展示的长度|number| --| 700|
|suffix|生成海报的图片类型|string| png/webp/jpeg| jpeg|
|scale|图片质量系数，数值越高，越清晰，质量越大|number| --| 5|


#### type = custom
|参数|描述|类型|可选值|默认值|
|:--|:--:|:--:|:--:|--:|
|type|元素类型|string| img/font/custom| --|
|callback|执行的绘制函数|fn| --| --|


### 版本 1.0
- 支持绘制文字，图片
- 支持图片圆角
- 支持文字单行最大长度，自动换行
- 支持用户自定义操作
- 支持海报的压缩

#### 后期优化方向
- 1. 修复文字不传lineHeight不展示换行文字
- 2. 兼容小程序
- 3. 支持文字背景图
- 4. 支持自定义圆角

