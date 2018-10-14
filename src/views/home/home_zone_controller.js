import { Indicator, Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import cTitle from 'components/title';




export default {
  data() {
    return {
        sort: 10000,

        sort1:990,

        province:[
            {
                name:"广东",
                item1:[
                    {
                        name:"广州",

                    },
                    {
                        name:"韶关",
                    }
                ]
            },
            {
                name:"广西",
                item1:[
                    {
                        name:"柳州"
                    }
                ]
            }
        ],

        currentIndex:0
    }
  },

  activated() {

   

  },

  mounted() {

    

  },
  methods: {

    toggle(event, n) {
        if (n == this.sort) {
            this.sort = 9999;
            return;
        } else {
            this.sort = n;
        }

        this.currentIndex=n;

    },

    toggle1(event, n) {
        if (n == this.sort1) {
            this.sort1 = 9999;
            return;
        } else {
            this.sort1 = n;
        }

    },
   
  },
  components: {cTitle}
}