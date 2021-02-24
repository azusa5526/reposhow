<template>
  <div id="app">
    <loading :active.sync="isLoading" />
    <div class="container min-height-100vh">
      <div class="row">
        <div class="col-12">
          <div class="bg-third text-center py-9 py-lg-11 my-3 my-lg-6">
            <h1>日本のアニメーション PUI PUI モルカー</h1>
            <p class="lead">100% PUI PUI inside</p>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-lg-8 order-1 order-lg-0">
          <div class="card bg-secondary mb-6" v-for="repo in repoData" :key="repo.id">
            <div class="card-header bg-third text-muted">main lang > {{ repo.language }}</div>
            <div class="card-body">
              <h3 class="card-title">{{ repo.name }}</h3>
              <p class="card-text fw-light mb-8">
                With supporting text below as a natural lead-in to additional content.
              </p>
              <a :href="repo.html_url" class="btn btn-primary">Repo Link</a>
            </div>
            <div class="card-footer bg-third text-end text-muted">
              {{ repo.created_at | isoTimeConvert }}
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-4 order-0 order-lg-1 position-relative">
          <div class="sidebar-item">
            <div class="sticky-section">
              <div class="card bg-secondary mb-6">
                <div class="card-body">
                  <img class="w-100 mb-6 mb-lg-11" src="./assets/img/avatar.jpg" alt="" />
                  <h3 class="card-title">azusa5526</h3>
                  <p class="card-text">
                    Hi! My name is Andrew. This is my github page.
                  </p>
                  <a href="https://github.com/azusa5526" class="btn btn-primary">My github</a>
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
            <div class="card bg-secondary mb-6">
              <div class="card-body text-center">Bottom</div>
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
      currentPage: 0,
      repoData: []
    };
  },

  methods: {
    getRepoData() {
      const api = `https://api.github.com/users/azusa5526/repos?page=${this.currentPage}&per_page=4`;
      this.isLoading = true;

      if (this.inTheEnd) {
        console.log('in the end');
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
            console.log('get repo data fail');
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
    }
  },

  mounted() {
    const options = {
      root: null,
      rootMargin: '0px 0px 0px 0px',
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
