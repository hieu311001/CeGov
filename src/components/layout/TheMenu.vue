<template>
    <div class="menu">
        <div class="menu-container">
            <div class="left-container">
                <div class="menu-item-container">
                    <router-link to="/">
                        <div class="menu-item">
                            <div class="menu-item__icon">
                                <icon class="icon icon-tq"></icon>
                            </div>
                            <div class="menu-item__text">Tổng quan</div>
                        </div>
                    </router-link>
                    <div class="menu-item">
                        <div class="menu-item__icon">
                            <icon class="icon icon-td"></icon>
                        </div>
                        <div class="menu-item__text">
                            <div class="item-text">Thi đua</div>
                            <div class="item-arrow">
                                <icon class="icon icon-arrowRight"></icon>
                            </div>
                        </div>
                    </div>
                    <div class="menu-item">
                        <div class="menu-item__icon">
                            <icon class="icon icon-kt"></icon>
                        </div>
                        <div class="menu-item__text">
                            <div class="item-text">Khen thưởng</div>
                            <div class="item-arrow">
                                <icon class="icon icon-arrowRight"></icon>
                            </div>
                        </div>
                    </div>
                    <div class="menu-item">
                        <div class="menu-item__icon">
                            <icon class="icon icon-qd"></icon>
                        </div>
                        <div class="menu-item__text">
                            <div class="item-text">Quyết định</div>
                            <div class="item-arrow">
                                <icon class="icon icon-arrowRight"></icon>
                            </div>
                        </div>
                    </div>
                    <div class="menu-item">
                        <div class="menu-item__icon">
                            <icon class="icon icon-hs"></icon>
                        </div>
                        <div class="menu-item__text">
                            <div class="item-text">Hồ sơ</div>
                            <div class="item-arrow">
                                <icon class="icon icon-arrowRight"></icon>
                            </div>
                        </div>
                    </div>
                    <div class="menu-item">
                        <div class="menu-item__icon">
                            <icon class="icon icon-tc"></icon>
                        </div>
                        <div class="menu-item__text">
                            <div class="item-text">Tra cứu</div>
                            <div class="item-arrow">
                                <icon class="icon icon-arrowRight"></icon>
                            </div>
                        </div>
                    </div>
                    <div class="menu-item">
                        <div class="menu-item__icon">
                            <icon class="icon icon-bc"></icon>
                        </div>
                        <div class="menu-item__text">
                            <div class="item-text">Báo cáo</div>
                        </div>
                    </div>
                    <div class="menu-line"></div>
                    <router-link to="/emulation">
                        <div class="menu-item">
                            <div class="menu-item__icon">
                                <icon class="icon icon-dm"></icon>
                            </div>
                            <div class="menu-item__text">
                                <div class="item-text">Danh mục</div>
                                <div class="item-arrow">
                                    <icon class="icon icon-arrowRight"></icon>
                                </div>
                            </div>
                        </div>
                    </router-link>
                    
                    <div class="menu-item">
                        <div class="menu-item__icon">
                            <icon class="icon icon-tl"></icon>
                        </div>
                        <div class="menu-item__text">
                            <div class="item-text">Thiết lập</div>
                            <div class="item-arrow">
                                <icon class="icon icon-arrowRight"></icon>
                            </div>
                        </div>
                    </div>
                    <div class="menu-line"></div>
                    <div class="menu-item">
                        <div class="menu-item__icon">
                            <icon class="icon icon-hd"></icon>
                        </div>
                        <div class="menu-item__text">
                            <div class="item-text">Hướng dẫn</div>
                            <div class="item-arrow">
                                <icon class="icon icon-arrowRight"></icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="toggle_btn">
                <div class="toggle-icon">
                    <icon class="icon icon-toggle"></icon>
                </div>
                <div class="toggle-text">Thu gọn</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.menu{
    position: absolute;
    left: 0;
    top: 56px;
    background: #fff;
    height: calc(100% - 56px);
    width: 204px;
    transition: width .2s;
    z-index: 12;
    box-shadow: inset 0 1.5px 2px 0 rgba(0,0,0,.1);
}

.menu-container{
    height: 100%;
}

.left-container{
    display: block;
    float: left;
    width: 100%;
    height: calc(100% - 50px);
    overflow: auto;
}

.menu-item-container{
    margin-top: 8px;
}

.menu-item{
    font-weight: 500;
    display: block;
    color: #000;
    position: relative;
    padding: 12px 0 12px 52px;
    margin: 8px 8px;
    cursor: pointer;
}

.menu-item__icon icon{
    display: block;
    height: 24px;
    width: 24px;
    position: absolute;
    top: 8px;
    left: 12px;
    background-repeat: no-repeat;
    background-color: transparent;
}

.item-arrow{
    height: 24px;
    width: 24px;
    position: absolute;
    right: 12px;
    top: 8px;
    opacity: 1;
    transition: opacity .6s linear;
}

.menu-line{
    border-top: 2px solid #ddd;
    margin: 0 14px;
}

.toggle_btn{
    position: absolute;
    bottom: 18px;
    margin: 0 8px 0 8px;
    width: 92%;
    border-radius: 8px;
    height: 40px;
    line-height: 40px;
    background: #edf1f5;
}

.toggle-icon icon{
    display: inline-block;
    margin-top: 8px;
    margin-left: 16px;
    left: 0;
    height: 24px;
    width: 24px;
    transform: rotate(0deg);
    transition-duration: .4s;
}

.toggle-text{
    position: absolute;
    left: 40px;
    bottom: 0px;
}
</style>