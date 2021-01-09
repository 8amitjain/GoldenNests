from django.contrib import admin

from .models import Cart, Order, CancelMiniOrder, Coupon, CouponCustomer, Payment

admin.site.register(Cart)
admin.site.register(Order)
admin.site.register(CancelMiniOrder)
admin.site.register(Coupon)
admin.site.register(CouponCustomer)
admin.site.register(Payment)
