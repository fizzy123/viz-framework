function imageDisplayWrapper(imageUrl, height, width) {
    return () => {
        s0.initImage("imageUrl")
        return src(s0).scale(1,height/window.innerWidth,width/window.innerHeight).mask(shape(4).scale(1/0.308,height/window.innerWidth,width/window.innerHeight))
    }
}
