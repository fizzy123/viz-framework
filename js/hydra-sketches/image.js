function imageDisplayWrapper(imageUrl, height, width) {
    return () => {
        s0.initImage("imageUrl")
        return src(s0).scale(1,width/window.innerWidth,height/window.innerHeight).mask(shape(4).scale(1/0.308,width/window.innerWidth,height/window.innerHeight))
    }
}
