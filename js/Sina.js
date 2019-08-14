function General() {}
General.prototype = {
    getEle: {
        tagName: function (tag) {
            return typeof "string" ? document.getElementsByTagName(tag) : null;
        },
        clsName: function (cls) {
            return typeof "string" ? document.getElementsByClassName(cls) : null;
        },
        id: function (id) {
            return typeof "string" ? document.getElementById(id) : null;
        },
        query: function (qur) {
            return typeof "string" ? document.querySelector(qur) : null;
        }
    }
}
var grl = new General();

/* 搜索框 */
var searchBox = (function () {
    var seek = grl.getEle.clsName("seek")[0],
        input = seek.children[0],
        styleArr = [input.style.border, input.style.backgroundColor, input.placeholder],
        text = "自动洗澡机";

    function search(ele) {
        input.placeholder += text;
        ele.addEventListener("focus", function () {
            changeStyle(this, "1px solid red", "#fff", text);
        }, false)
        ele.addEventListener("blur", function () {
            changeStyle(this, styleArr[0], styleArr[1], styleArr[2] + text);
        }, false)
    }

    function changeStyle(ele, border, bgColor, place) {
        ele.style.border = border;
        ele.style.backgroundColor = bgColor;
        ele.placeholder = place;
    }
    return function () {
        search(input);
    }
}())
searchBox();

/** 头部 */
function headerFn() {
    var header = grl.getEle.clsName("header")[0],
        scrollY = 0;
    return function shadow() {
        document.addEventListener("scroll", function () {
            scrollY = window.pageYOffset;
            scrollY > 0 ? setTimeout(function () {
                shadow(header);
            }, 500) : setTimeout(function () {
                none(header);
            }, 500);
        }, false)

        function shadow(obj) {
            obj.style.backgroundColor = "rgba(255,255,255,.8)";
            obj.style.boxShadow = "1px 1px 1px #ccc";
        }

        function none(obj) {
            obj.style.boxShadow = "none";
            obj.style.backgroundColor = "#fff";
        }
    }
}
var headers = headerFn();
headers();

/** 登录面板 */
var loginPanel = (function () {
    var login = grl.getEle.clsName("login")[0], //登录键
        panel = grl.getEle.clsName("login-panel")[0], //面板
        masking = grl.getEle.clsName("masking")[0], //蒙版
        close = panel.children[0], //关闭面板
        tab = panel.children[1], //选项容器
        leri = tab.children, //选项
        content = grl.getEle.clsName("formLogin"), //显示区
        phone = grl.getEle.clsName("login-phone")[0], //手机图片
        qrcode = grl.getEle.clsName("qrcode")[0]; //二维码图片
    Operate.prototype = {
        event: function (ele, eventType, fn) {
            ele.addEventListener(eventType, fn, false);
        },
        show: function (ele) {
            ele.style.display = "block";
        },
        hidden: function (ele) {
            ele.style.display = "none";
        },
        clsName: function (ele, cls) {
            ele.className = cls;
        }
    }

    function Operate() {
        this.showPanel = function (ctrl, eventType, ele1, ele2) {
            operate.event(ctrl, eventType, function () {
                Operate.prototype.show(ele1);
                Operate.prototype.show(ele2);
            })
        };
        this.hiddenPanel = function (ctrl, eventType, ele1, ele2) {
            operate.event(ctrl, eventType, function () {
                Operate.prototype.hidden(ele1);
                Operate.prototype.hidden(ele2);
            })
        };
    }
    var operate = new Operate();
    Tab.prototype = operate;

    function Tab() {
        this.toggle = function (ctrl, option, cls) {
                for (var i = 0; i < ctrl.length; i++) {
                    (function (index) {
                        tab.event(ctrl[index], "click", function () {
                            for (var j = 0; j < ctrl.length; j++) {
                                tab.clsName(ctrl[j], "");
                                tab.hidden(option[j]);
                            }
                            this.style.transition = "all .1s";
                            tab.show(option[index]);
                            tab.clsName(this, cls);
                        })
                    }(i))
                }
            },
            this.showPhone = function (ctrl, eventType, target) {
                tab.event(ctrl, eventType, function () {
                    tab.show(target);
                });
            },
            this.hiddenPhone = function (ctrl, eventType, target) {
                tab.event(ctrl, eventType, function () {
                    tab.hidden(target);
                });
            }
    }
    var tab = new Tab();
    return function () {
        operate.showPanel(login, "click", panel, masking);
        operate.hiddenPanel(close, "click", panel, masking);
        tab.toggle(leri, content, "current");
        tab.showPhone(qrcode, "mouseover", phone);
        tab.hiddenPhone(qrcode, "mouseleave", phone);
    }
}())
loginPanel();

/** 左侧导航栏 */
function leftNav() {
    var nav = grl.getEle.clsName("left_nav")[0],
        alla = nav.getElementsByTagName("a"),
        header = grl.getEle.clsName("header")[0],
        scrollY = 0,
        headerH = header.offsetHeight,
        navY = nav.offsetTop,
        len = alla.length;

    function cutClass() {
        for (var i = 0; i < len; i++) {
            alla[i].addEventListener("mouseover", function () {
                for (var j = 1; j < len; j++) {
                    alla[j].className = "";
                }
                this.className = "leftNavCurrent";
            }, false)
        }
    }

    function top() {
        nav.style.transition = "all .5s";
        document.addEventListener("scroll", function () {
            scrollY = document.documentElement.scrollTop;
            if (scrollY >= headerH) {
                nav.style.position = "fixed";
                nav.style.top = headerH + "px";
            } else {
                nav.style.position = "absolute";
                nav.style.top = navY + "px";
                // nav.style = "none";
            }
        }, false)
    }
    return function done() {
        cutClass();
        top();
    }
}
var leftnav = leftNav();
leftnav();

/** 右侧登录面板 */
var rightLogin = (function () {
    var box = grl.getEle.clsName("loginBox")[0], //最外层盒子
        panel = box.children[0], //登录面板
        tabBox = grl.getEle.clsName("formLogin_tab")[0], //选项盒子
        tab = tabBox.children, //选项
        phone = panel.children[0], //手机登录
        code = panel.children[1], //二维码登录
        content = grl.getEle.clsName("right_main"), //可视区
        input = panel.getElementsByTagName("input");
    var obj = {
        event: function (ele, eventType, fn) {
            ele.addEventListener(eventType, fn, false);
        },
        show: function (ele) {
            ele.style.display = "block";
            return this;
        },
        hidden: function (ele) {
            ele.style.display = "none";
            return this;
        },
        cls: function (ele, c) {
            ele.className = c;
            return this;
        }
    }

    function cut() {
        var timer = null,
            Ptop = 0,
            Pright = 0,
            Ctop = 40,
            Cright = -40;
        for (var i = 0; i < tab.length; i++) {
            (function (index) {
                obj.event(tab[i], "click", function () {
                    for (var j = 0; j < tab.length; j++) {
                        obj.cls(tab[j], "");
                    }
                    for (var k = 0; k < content.length; k++) {
                        obj.hidden(content[k]);
                    }
                    this.style.transition = "all .2s";
                    obj.cls(this, "rightCurrent").show(content[index]);
                })
            }(i))
        }

        obj.event(phone, "click", function () {
            for (var j = 0; j < tab.length; j++) {
                obj.cls(tab[j], "");
                obj.hidden(content[j]);
            }
            obj.show(content[2]);
            clearInterval(timer);
            timer = setInterval(function () {
                Ptop -= 10;
                Pright += 10;
                Ctop -= 10;
                Cright += 10;
                phone.style.top = Ptop + "px";
                phone.style.right = Pright + "px";
                code.style.top = Ctop + "px";
                code.style.right = Cright + "px";
                if ((Ptop >= -40 && Pright >= 40)) {
                    clearInterval(timer);
                }
            }, 30)
        })

        obj.event(code, "click", function () {
            for (var j = 0; j < tab.length; j++) {
                obj.cls(tab[j], "");
                obj.hidden(content[j]);
            }
            obj.show(content[1]);
            obj.cls(tab[1], "rightCurrent");
            clearInterval(timer);
            timer = setInterval(function () {
                Ptop += 10;
                Pright -= 10;
                Ctop += 10;
                Cright -= 10;
                phone.style.top = Ptop + "px";
                phone.style.right = Pright + "px";
                code.style.top = Ctop + "px";
                code.style.right = Cright + "px";
                if ((Ptop >= 0 && Pright >= 0)) {
                    clearInterval(timer);
                }
            }, 30)
        })
    }

    function inputFn() {
        var holder;
        for (var i = 0; i < input.length; i++) {
            obj.event(input[i], "focus", function () {
                holder = this.placeholder;
                this.placeholder = "";
                obj.event(this, "blur", function () {
                    this.placeholder = holder;
                })
            })
        }
    }

    function changeImg() {
        var parent = grl.getEle.clsName("elseLogin")[0],
            ul = parent.children[1],
            li = ul.children,
            parent2 = grl.getEle.clsName("elseLogin")[1],
            ul2 = parent2.children[1],
            li2 = ul2.children;
        for (var i = 0; i < li.length; i++) {
            li[i].style.transition = "all 1s";
            li2[i].style.transition = "all 1s";
            (function (index) {
                // obj.event(li[index], "mouseover", function () {
                    packaing(li[index], (index + 1));
                // })
                // obj.event(li2[index], "mouseover", function () {
                    packaing(li2[index], (index + 1));
                // })
            }(i))
        }

        function packaing(obj, index) {
            obj.style.backgroundColor = "#fff";
            obj.style.backgroundImage = "url(image/li-icon" + index + ".png)";
            obj.style.backgroundSize = "100% 100%";
        }
    }

    return function () {
        cut();
        inputFn();
        changeImg();
    }
}())
rightLogin();

/** 一些滚动 */
function scrollFn() {
    var header = center = grl.getEle.clsName("header")[0],
        center = grl.getEle.clsName("center")[0],
        main = grl.getEle.clsName("newsMain")[0],
        unread = grl.getEle.clsName("unread")[0], //未读消息框
        unreadTop = grl.getEle.clsName("unreadTop")[0], //未读消息置顶框
        closeUnread = unread.children[1],
        closeUnreadTop = unreadTop.children[1],
        scrollY = 0,
        backTop = grl.getEle.clsName("backTop")[0],
        fined = grl.getEle.clsName("fined")[0], //找人模块
        login = grl.getEle.clsName("loginBox")[0], //登录模块
        last = grl.getEle.clsName("borderNone")[0],
        a = last.getElementsByTagName("a")[0];

    function show(obj) {
        obj.style.display = "block";
    }

    function hidden(obj) {
        obj.style.display = "none";
    }

    function remove(target, origin) {
        origin.removeChild(target);
    }
    return function () {

        closeUnread.addEventListener("click", function () {
            remove(unread, center);
            remove(unreadTop, center);
        }, false)

        closeUnreadTop.addEventListener("click", function () {
            remove(unread, center);
            remove(unreadTop, center);
        }, false)

        document.addEventListener("scroll", function () {
            scrollY = document.documentElement.scrollTop;
            if (scrollY > 0) {
                show(backTop);
            }
            if (scrollY == 0) {
                hidden(backTop);
            }
            if (scrollY >= unread.offsetTop) {
                show(unreadTop);
                hidden(unread);
            }
            if (scrollY <= main.offsetTop) {
                show(unread);
                hidden(unreadTop);
            }
            if (scrollY >= a.offsetTop) {
                login.style.position = "fixed";
                login.style.top = (header.offsetHeight + 10) + "px";
            } else {
                login.style = "none";
            }
        }, false)
    }
}
var scroll = scrollFn();
scroll();


/* 轮播图 */
var autoPlay = (function () {

    function Animation() {
        this.constant = function (obj, target, speed) {
            //1.清除定时器
            clearInterval(obj.timer); //将定时器传入元素中
            //2.判断方向
            var dir = obj.offsetLeft < target ? speed : -speed;
            //3.设置定时器
            obj.timer = setInterval(function () {
                obj.style.left = obj.offsetLeft + dir + 'px';
                if (Math.abs(target - obj.offsetLeft) < Math.abs(dir)) {
                    obj.style.left = target + 'px';
                    clearInterval(obj.timer);
                }
            }, 20);
        }
    }
    var animation = new Animation();

    var ul = grl.getEle.clsName("autoPlayBox")[0].children[0],
        ol = grl.getEle.clsName("autoPlayBox")[0].children[1],
        ulis = grl.getEle.clsName("autoPlayBox")[0].children[0].children,
        olis = grl.getEle.clsName("autoPlayBox")[0].children[1].children,
        currentIndex = 0,
        indicatorIndex = 0; /* ul和olli的下标 */
    function Player() {
        //方法
        this.clone = function (origin, target) { //克隆li标签
            origin.appendChild(target.cloneNode(true));
            return this;
        }
        this.pageNum = function (eLen, ele, parent, index, cls) { //动态创建页码
            for (var i = 0; i < eLen.length - 1; i++) {
                var li = document.createElement(ele);
                parent.appendChild(li);
            }
            parent.children[index].className = cls;
            return this;
        }
        this.mouseOver = function (ele, cls, obj, wid, speed, index1, index2) { //监听鼠标进入圆点
            for (var i = 0; i < ele.length; i++) {
                (function (index) {
                    ele[index].addEventListener("click", function () {
                        for (var j = 0; j < ele.length; j++) {
                            ele[j].className = "";
                        }
                        this.className = cls;
                        animation.constant(obj, -(wid * index), speed);
                        index1 = index2 = index;
                    }, false)
                }(i))
            }
            return this;
        }
        this.playImg = function (index1, eLen, obj, wid, speed) {
            //ul滚动
            // console.log(eLen.length);6
            var timer = setInterval(function () {
                index1++;
                if (index1 > eLen.length - 1) { //当ul下标大于5
                    obj.style.left = "0";
                    index1 = 1;
                }
                animation.constant(obj, -index1 * wid, speed);
            }, 6000)
            // console.log(ulis.length - 1);
            return this;
        }
        this.playPage = function (index2, ele, cls) {
            timer = setInterval(function () {
                index2++;
                if (index2 > ele.length - 1) { //ele.length - 1 = 4, index2 = 5 时 index2 = 0
                    index2 = 0;
                }
                for (var j = 0; j < ele.length; j++) {
                    ele[j].className = "";
                }
                ele[index2].className = cls;
            }, 6000)
        }
    }
    var player = new Player();

    return function () {
        player.clone(ul, ulis[0]).pageNum(ulis, "li", ol, 0, "playCurrent").mouseOver(olis, "playCurrent", ul, 660, 90, currentIndex, indicatorIndex).playImg(currentIndex, ulis, ul, 660, 90).playPage(indicatorIndex, olis, "playCurrent");
    }
}())
autoPlay();
