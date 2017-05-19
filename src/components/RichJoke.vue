<template>
    <div class="page has-navbar" v-nav="{ title: '笑图' }">
        <scroller class="page-content"
                  :on-refresh="onRefresh"
                  :on-infinite="onInfinite"
                  ref="scroller">
            <div v-for="(item, index) in items" @click="onItemClick(index)" style="white-space:normal;line-height:20px;font-size: 16px;"
                 class="item item-borderless" :class="{'item-stable': index % 2 == 0}">
                <div style="margin-bottom: 10px;font-size: 14px;color: rgba(0,0,0,0.5);">
                    <span>{{ item.get('name') }}</span>
                    <span style="float: right">{{ formatDate(item.get('time')) }}</span>
                </div>
                <div>
                    {{ item.get('content') }}
                </div>

            </div>
        </scroller>
    </div>
</template>
<script>
    import AV from 'leancloud-storage/dist/node/index.js';
    import utils from '../utils';
    export default {
        data () {
            return {
                items: [],
                index:0,
                size:20
            }
        },
        created () {
//          var TestObject = AV.Object.extend('TestObject');
//          var testObject = new TestObject();
//          testObject.save({
//              words: 'Hello World!'
//          }).then(function(object) {
//              alert('LeanCloud Rocks!');
//          })
        },
        mounted () {
            this.onRefresh();
        },

        methods: {
            onRefresh() {
                this.index = 0;
                this.items = [];
                var query = new AV.Query('Joke');
                query.skip(this.index);
                query.limit(this.size);
                query.descending('time');
                query.equalTo('type', 1);
                query.find().then(jokes => {
                    // 查询到商品后，在前端展示到相应的位置中。
                    console.log(jokes);
                    for (let i = 0; i < jokes.length; i++){
                        let joke = jokes[i];
//                  console.log(joke.get('content'));
                        this.items.push(joke);
                    }

                    this.index = this.index + 1;
                    this.top = 1;
                    this.bottom = jokes.length;

                    setTimeout(() => {
                        if (this.$refs.scroller)
                            this.$refs.scroller.finishPullToRefresh()
                    })

                }).catch(function(error) {
                    alert(JSON.stringify(error));
                });
            },

            onInfinite() {
                var query = new AV.Query('Joke');
                let skip = this.index*this.size;
                console.log('onInfinite: '+skip);
                if (skip <= 0){
                    if (this.$refs.scroller){
                        this.$refs.scroller.finishInfinite();
                    }
                    return;
                }
                query.skip(this.index*this.size);
                query.limit(this.size);
                query.descending('time');
                query.equalTo('type', 0);
                query.find().then(jokes => {
                    // 查询到商品后，在前端展示到相应的位置中。
//              console.log(jokes);
                    for (let i = 0; i < jokes.length; i++) {
                        let joke = jokes[i];
//                  console.log(joke.get('content'));
                        this.items.push(joke);
                    }

                    this.index ++
                    this.bottom = this.bottom + jokes.length;

                    setTimeout(() => {
                        if (this.$refs.scroller)
                            this.$refs.scroller.finishInfinite()
                    })

                }).catch(function(error) {
                    alert(JSON.stringify(error));
                });

            },

            onItemClick(index) {
                console.log(index)
            },
            formatDate(date){
                return utils.formatDate(date);
            }
        }
    }
</script>
