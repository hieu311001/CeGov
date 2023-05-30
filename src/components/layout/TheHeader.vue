<template>
    <div class="nav">
        <div class="nav-layout">
            <div class="nav-left">
                <div class="nav-left__icon">
                    <icon class="icon icon-option"></icon>
                </div>
                <div class="nav-left__logo">
                    <div class="nav-logo">
                        <icon class="icon icon-logo logo-cegov"></icon>
                    </div>
                    <div class="nav-content">MISA CeGov</div>
                </div>
            </div>
            <div class="nav-right" v-tooltip="{theme: {placement: 'bottom'}}">
                <div class="nav-right__icon" v-tooltip="'Thông báo'">
                    <icon class="icon icon-notify"></icon>
                </div>
                <div class="nav-right__icon" v-tooltip="'Trợ giúp'">
                    <icon class="icon icon-help"></icon>
                </div>
                <div class="nav-right__icon" v-tooltip="'Tài liệu'">
                    <icon class="icon icon-document"></icon>
                </div>
                <div class="nav-right__icon">
                    <icon class="icon icon-settings" v-tooltip="'Cài đặt'"></icon>
                </div>
                <div class="nav-right__avatar">
                    <div class="nav-right__image">
                        <img src="@/assets/img/getavatar.png" alt="" class="avatar">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.nav{
    position: relative;
    height: 56px;
    background: #fff;
    min-width: 1036px;
}
.nav-layout{
    display: flex;
    justify-content: space-between;
}
.nav-left, .nav-right, .nav-left__logo{
    display: flex;
    align-items: center;
    justify-content: center;
}

.nav-content{
    font-size: 20px;
    font-weight: 700;
}

.nav-left__icon{
    height: 100%;
    padding: 0 16px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.nav-right__icon{
    position: relative;
    width: 32px;
    height: 28px;
    margin: 14px 5px;
}

.nav-right__icon:hover{
    cursor: pointer;
    background-color: #f5f5f5;
    border-radius: 50%;
}

.nav-right__icon icon {
    position: absolute;
    top: 3px;
    left: 4px;
}

.nav-right__avatar{
    text-align: center;
    align-items: center;
    display: flex;
    height: 100%;
    width: 48px;
    position: relative;
}

.nav-right__avatar:hover{
    cursor: pointer;
    background-color: #f5f5f5;
}

.nav-right__image{
    /* margin: 10px 8px; */
    margin: auto;
    position: relative;
}


.nav-right__image img{
    border: none;
    border-radius: 50%;
    height: 32px;
    width: 32px;
}

.logo-cegov{
    display: block;
    width: 32px;
    height: 32px;
    background-size: 32px;
    margin-right: 12px;
}
</style>