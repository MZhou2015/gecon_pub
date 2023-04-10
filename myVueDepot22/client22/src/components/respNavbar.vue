<template>
<div>
 <nav>
    <div class="logo">Logo</div>
    <ul class="nav-links" :class="{ 'nav-active': isActive }">
      <li v-for="(link, index) in links" :key="index">
        <a href="#">{{ link }}</a>
      </li>
    </ul>
    <div class="burger" @click="isActive = !isActive">
      <div class="line1"></div>
      <div class="line2"></div>
      <div class="line3"></div>
    </div>
  </nav>
<br>
  <div class="dropdown">
  <button class="dropbtn">Dropdown</button>
  <div class="dropdown-content">
    <a href="#">Option 1</a>
    <a href="#">Option 2</a>
    <a href="#">Option 3</a>
  </div>
  </div>
  <!---------    New NaviBar  test -->
  <div class="menubar">
    <div class="log1"><img src="../assets/store_logo.png"></div>
    <ul class="mynav" :class="{ 'nav-active': isActive2 }">
        <li><a href="#">Webaccounting</a>
            <ul>
                <li><a href="#">Hello Opt1</a></li>
                <li><a href="#" >Books</a></li>
            </ul>
        </li>
        <li><a href="#">Webacc23</a></li>
        <li><a href="#">AAebacc254</a>
            <ul>
                <li><a href="#">Option A</a></li>
                <li><a href="#" >Finance ReportB</a></li>
            </ul>
        </li>
        <li><a href="#">Log out </a></li>
  </ul>
  <div class="burger2" @click="isActive2 = !isActive2">
       <div class="linea"></div>
       <div class="lineb"></div>
       <div class="linec"></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'respNavbar',
  data () {
    return {
      links: ['Home', 'About', 'Services', 'Contact'],
      isActive: false,
      isActive2: false
    }
  },
  computed: {
    navbarCollapseClasses () {
      return {
        'navbar-collapse': true,
        'collapse': this.isCollapsed
      }
    }
  },
  methods: {
    toggleActive (link) {
      this.links.forEach((l) => {
        if (l.id === link.id) {
          l.isActive = true
        } else {
          l.isActive = false
        }
        if (l.dropdown) {
          l.sublinks.forEach((s) => {
            if (s.id === link.id) {
              s.isActive = true
            } else {
              s.isActive = false
            }
          })
        }
      })
    },
    toggleNav () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menubar{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #bbabca
}
.burger2 {
  display: none;
  cursor: pointer;
}
.burger2 div {
  width: 25px;
  height: 3px;
  background-color: #9b3e3e;
  margin: 5px;
  transition: all 0.3s ease;
}
.mynav {
  display: flex;
  justify-content: space-between;
  width: 50%;
}
.mynav li {
list-style: none;
}
.mynav a {
padding: 2rem;
}
.mynav li ul{
    display: none;
    position: absolute;
    background-color: #dfdfdf;
    border-radius: 0px 0px 6px 6px;
}
.mynav li:hover ul{
    display: block;
 }
/*********************    nav Css   ****************************/
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 999;
}

.nav-links {
  display: flex;
  justify-content: space-between;
  width: 50%;
}

.nav-links li {
  list-style: none;
}

.nav-links a {
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 1rem;
  transition: all 0.3s ease;
}
.nav-links a:hover {
  background-color: #fff;
  color: #333;
}

.burger {
  display: none;
  cursor: pointer;
}

.burger div {
  width: 25px;
  height: 3px;
  background-color: #fff;
  margin: 5px;
  transition: all 0.3s ease;
}

@media screen and (max-width: 1024px) {
  .mynav {
    position: fixed;
    right: 0;
    height: 100vh;
    top: 18rem;/* 调整菜单的垂直位置 */
    background-color: #333;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 45rem); /* 减少菜单的高度 */
    width: 150px;
    transform: translateX(100%);
    transition: all 0.5s ease;
  }

  .mynav.nav-active {
    transform: translateX(0%);
  }
  .mynav li ul{
    float: right;
    display: none;
    position: absolute;
    right: 130px;
    background-color: #dfdfdf;
    border-radius: 0px 0px 6px 6px;
}
  /**************************************/
  .nav-links {
    position: fixed;
    right: 0;
    height: 100vh;
    top: 14rem;/* 调整菜单的垂直位置 */
    background-color: #333;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 34rem); /* 减少菜单的高度 */
    width: 40%;
    transform: translateX(100%);
    transition: all 0.5s ease;
  }

  .nav-links.nav-active {
    transform: translateX(0%);
  }
  /**************************************/

  .burger  {
    display: block;
  }
  .burger2  {
    display: block;
  }
}
/******************************************* */
/* 下拉菜单按钮 */
.dropbtn {
  background-color: #4CAF50;
  color: white;
  padding: 12px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

/* 下拉菜单内容（隐藏） */
.dropdown-content {
  display: none;
  position: absolute;
  z-index: 1;
}

/* 下拉菜单选项 */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* 鼠标悬停在下拉菜单选项上时的样式 */
.dropdown-content a:hover {
  background-color: #f1f1f1;
}

/* 显示下拉菜单内容 */
.dropdown:hover .dropdown-content {
  display: block;
}
</style>
