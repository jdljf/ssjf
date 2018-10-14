import cTitle from 'components/title';
import { mapState, mapMutations } from 'vuex';
import { Indicator, Toast } from 'mint-ui';
import { Switch } from 'mint-ui';

import { Field } from 'mint-ui';
import { Picker } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import District from 'src/gov_province_city_area_id';
//import cOrder from 'components/order';

const TAG_ACTION_BUY = "-2";//直接购买
const TAG_ACTION_CART = "-1";//1购物车结算
var _root_tag = "";//0 直接购买 1购物车结算
var _goodsId = "";
var _optionsId = "";
var _total = 1;
var currentAddId = "";
var currentAddress = {};
var _cart_ids = [];
export default {
    data() {
        return {
            order_data: "",
            integral:window.localStorage.integral,
            onclast: false,
            toi: this.fun.getKeyByI(),
            goodsInfo: {},
            order: {},
            dispatch: {},
            realname: "",//收件人
            mobile: "",
            address: "",
            goods: [],
            goods_price: 0,
            dispatch_price: 0,
            price: 0,
            discount_price: 0,
            popupSpecs: false,
            addressData: [],

            //优惠券
            popupCouponSpecs: false,
            coupon_size: 0,
            checkCouponList: [],
            use_coupon_size: 0,

            //积分抵扣 其他抵扣
            checkDeductionList: [],


            //新增地址v2------------------------------------------------新增地址v2//
            form: {
                username: '',
                mobile: '',
                province: '',
                city: '',
                district: '',
                street: '',
                address: '',
                isDefault: false,
            },
            district: District,//地址本地数据
            popAddAddress: false,
            addressShow: false,
            addressName: "",//地址区域
            strShow: false,//街道显示
            streetShow: false,//街道pop
            //新增地址v2------------------------------------------------新增地址v2//
		
						show2: false,	//显示选择配送方式的弹窗标志
						
            //跨境
            isTaxGoods: false,
            member_name: '',
            member_card: '',
            popupMemberSpecs: false,
            explain_title: '',
            explain_content: '',

            //O2O部分
            storeCarts: [],
            store_id: 0,
            selected: 0,
            store_info: {},
            linkinfo: {
                mobile: '',
                name: '',
            },
            dispatch: [],


            //个人信息和修改
            myRealname:"",
            myIdcard:"",
            showMyinfo:false,

            //租赁商品标识
            isRent:false,

            //权益商品选择列表
            checkList:[],

            //是否选择权益商品
            isRightChoose:false,

            //租期
            rentTime:[],

            //可以免租的件数
            rentFree:"",

            //是否开启会员权益开关
            isOpenRight:false,

            //

            currentIndex:"999",

            //同意租赁协议
            agreement:false,

            agreementShow:false,

            //租赁协议
            agreeCon:{},

            //免押件数
            rent_deposit_free:0,

            //免租件数

            rent_free:0

            
            

        }
    },



    activated() {},

    mounted() {},
    methods: {
    	changetext (val) {
	    	console.log(this.form.price)
	      this.form.reason=val
	      this.show1=false
	    },
    },
    components: { cTitle }
}