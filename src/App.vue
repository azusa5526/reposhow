<template>
  <div id="app">
    <loading :active.sync="isLoading" />
    <div class="container main-container">
      <div class="row">
        <div class="col-12">
          <div class="bg-third text-center py-9 py-lg-11 my-3 my-lg-6">
            <h1>アニメーション PUI PUI モルカー</h1>
            <p class="lead">Infinite Scroll</p>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-lg-8 order-1 order-lg-0">
          <div class="card bg-secondary mb-6" v-for="repo in repoData" :key="repo.id">
            <div class="card-header bg-third text-muted">main lang > {{ repo.language }}</div>
            <div class="card-body">
              <h3 class="card-title">{{ repo.name }}</h3>
              <p v-if="repo.description === null" class="card-text fw-light mb-8">
                There's something fantastic here but the author wasn't write any description.
              </p>
              <p v-else class="card-text fw-light mb-8">
                {{ repo.description }}
              </p>
              <a :href="repo.html_url" class="btn btn-primary"
                >Repo Link<i class="fas fa-link text-dark ms-3"></i
              ></a>
            </div>
            <div
              class="card-footer bg-third text-end text-muted border-2 border-top border-primary"
            >
              Create at -
              {{ repo.created_at | isoTimeConvert }}
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-4 order-0 order-lg-1 position-relative">
          <div class="sidebar-item">
            <div class="sticky-section">
              <div class="card bg-secondary mb-6">
                <div class="card-body">
                  <img class="w-100 mb-6" src="./assets/img/avatar.jpg" alt="" />
                  <h3 class="card-title"><i class="fab fa-github-alt fs-4 me-3"></i>azusa5526</h3>
                  <p class="card-text">Hi! My name is Andrew. This is my github page.</p>
                  <div class="d-flex justify-content-end mt-11">
                    <a href="https://github.com/azusa5526" class="btn btn-primary px-6"
                      >My github</a
                    >
                  </div>
                </div>
                <div class="card-footer bg-third text-muted"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-8">
          <div ref="target">
            <div class="card mb-11" :class="{ 'bg-secondary': inTheEnd, 'bg-primary': !inTheEnd }">
              <div v-if="!inTheEnd" @click="loadRepoManually()" class="card-body text-center">
                <span class="text-dark">Click to load manually</span>
              </div>
              <div v-else @click="toTop()" class="card-body text-center">
                <span class="text-light">Click to top</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},

  data() {
    return {
      isLoading: false,
      inTheEnd: false,
      currentPage: 1,
      repoData: []
    };
  },

  methods: {
    getRepoData() {
      const api = `https://api.github.com/users/azusa5526/repos?page=${this.currentPage}&per_page=4`;
      this.isLoading = true;

      if (this.inTheEnd) {
        this.isLoading = false;
        console.log('In the end');
      } else {
        this.$http.get(api).then((response) => {
          if (response.status === 200) {
            if (response.data.length < 4) {
              this.inTheEnd = true;
            }
            this.isLoading = false;
            Array.prototype.push.apply(this.repoData, response.data);
          } else {
            this.isLoading = false;
            console.log('Get repo data fail');
          }
        });
      }
    },

    handleIntersection(entries) {
      const vm = this;
      entries.forEach((entry) => {
        if (entry.isIntersecting && this.inTheEnd !== true) {
          vm.currentPage += 1;
          vm.getRepoData();
        }
      });
    },

    loadRepoManually() {
      this.currentPage += 1;
      this.getRepoData();
    },

    toTop() {
      window.scroll(0, 0);
    }
  },

  created() {
    this.getRepoData();
  },

  mounted() {
    const options = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: [0]
    };
    const observer = new IntersectionObserver(this.handleIntersection, options);
    observer.observe(this.$refs.target);
  }
};
</script>

<style lang="scss">
@import './assets/scss/all.scss';
</style>
