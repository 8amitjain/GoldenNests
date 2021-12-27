from django.contrib import admin

from .models import Cart, Order, CancelOrder, Coupon, CouponCustomer, Payment, OfflineOrder, TableCart

admin.site.register(Cart)
admin.site.register(Order)
admin.site.register(CancelOrder)
admin.site.register(Coupon)
admin.site.register(CouponCustomer)
admin.site.register(Payment)
admin.site.register(TableCart)
admin.site.register(OfflineOrder)
