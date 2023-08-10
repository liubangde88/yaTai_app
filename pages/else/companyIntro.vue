<template>
	<view class="companyIntro-container">
		<u-navbar :title="$t('message.companyIntro')" :placeholder="true" @leftClick="back" />
		<view>
			<view class="title">EHA国际医疗整形机构</view>
			<view class="sub-title">成立時間1998年 2015年开始成立线上APP</view>
			<view class="content">
				      EHA医疗中心整形机构是由Elias Tam医生创立，Elias Tam医生曾任新加坡分会会长（2018-2019）、国际外科医师学会国际执行理事会成员之一和太平洋联合会秘书（2016-2021）、国际执行委员会世界司库、亚洲头发修复外科医生协会前会员委员会成员和新加坡男性健康协会委员会成员。谭医生获委任为伦敦大学学院临床讲师，是唯一一位获此殊荣的美容医生，也是唯一一位获此殊荣的亚洲医生。他还是国际美容医学会议和研讨会的演讲者。谭医生于2010年创办了Myface实体工作坊，为医生提供先进的实践培训，并开设了Myface公共论坛，以增强公众的能力，并帮助澄清有关美容治疗的任何神话和错误信息。为了扩大老牌医疗从业者和行业新人的技能，Elias Tam医生为多家制药公司（包括高德美、艾尔建、麦氏、益普森和美纳里尼）以及激光应用进行了培训（同时也是培训师）。谭医生在美容医学领域工作了20多年，他坚信分享和传播他的知识和经验，以造福新医生和未来的医生。为此，他希望这个网站能够成为该领域所有从业人员的资源基础和参考点。医学美容医生共同发起创立的，汇聚先进的设备仪器，拥有世界同步整形美容技术， 和经验丰富的塑美医疗团队，EHA医美下设医学整形、再生青春医疗、韩国皮肤管理三大高端定制美学中心，提供包括医学整形、韩国皮肤管理、健康抗衰老、海外医疗等全方位健康美丽定制服务，经过10年发展和沉淀，其中整形外科、形体雕塑、抗衰老、微整形、立体美肤等综合项目上，均拥有技术，达到前沿水准。
				EHA国际医疗整形机构整形手法和美学标准理念方面融合了融合了港澳台、欧美、日韩以及内地的前沿医学美容的精髓，以现代医美为理念、医美高科技为根本、以示范性，高定位加强软件建设。
			</view>
			<image src="@/static/img/companyIntro-img1.png" class="img1" />
			<view class="content">
				      同时EHA实行VIP会员预约制度，为会员提供一对一的美丽定制方案及专属跟踪，让广大求美者不出国门就可以享受前沿高端的尊贵的医美服务，备受当红明星、网红、时尚名媛和爱美人士的青睐和好评！
			</view>
			<image src="@/static/img/companyIntro-img2.png" class="img1" />
			<view class="content-title">EHA整形优势项目：</view>
			<view class="round-content">
				<view class="content">
					作为整形医疗行业的龙头品牌，为了丰富整形市场，而打造出的一款创新型的线上国际医疗代理整形接单平台， 在国家实行共同富裕的经济体系建设中做出一系列的扶持政策支持每一位代理的事业。有专业的团队的带领，从而让每一位融入公司的新成员在收益上有一定的保障。让每一位有需求的顾客跟商家能互补互利。
				</view>
				<image src="@/static/img/companyIntro-img3.png" class="img1" />
			</view>
			<view class="content">      EHA国际医疗整形机构能为顾客提供一站式塑美服务，以高品质的专业整形美容技术、服务、产品，为广大爱美人士缔造健康美丽优质的时尚新生活，一起传递美丽的永恒魅力。</view>
		</view>
	</view>
</template>

<script>
	export default {
	}
</script>
<style scoped>
	.companyIntro-container{
		color: #000000;
		margin-left: 40rpx;
		margin-right: 40rpx;
		.title{
			font-family: PingFang HK;
			font-size: 32rpx;
			font-weight: 600;
			text-align: center;
			margin-top: 54rpx;
		}
		.sub-title{
			font-family: PingFang HK;
			font-size: 28rpx;
			font-weight: 400;
			text-align: center;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
		}
		.content{
			font-family: PingFang SC;
			font-size: 24rpx;
			font-weight: 400;
			line-height: 1.5em;
			text-indent: 2em;

		}
		.content-title{
			font-family: PingFang SC;
			font-size: 28rpx;
			font-weight: 500;
			margin-bottom: 20rpx;
		}
		.round-content{
			display: flex;
			gap: 20rpx;
			.content{
				flex: 0 0 400rpx;
			}
		}
		.img1{
			width: 100%;
			height: 300rpx;
			margin-bottom: 40rpx;
		}
	}
</style>
