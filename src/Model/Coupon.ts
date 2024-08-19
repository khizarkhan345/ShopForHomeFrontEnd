export class Coupon {
    constructor(
        public couponCode: string,
        public couponPercentage: number,
        public userIds: string[]
    ){}
}