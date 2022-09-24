export const requestUrl = "http://167.71.237.134/v1/";

//export const requestUrl = "https://dev-server.ripshipworldventures.com/v1/";

export const URLS = {
  //auth
  BASE: requestUrl,
  ADMINLOGIN: requestUrl + "core/login",
  CHANGEPASSOWRD: requestUrl + "core/change-password/",
  LOGOUT: requestUrl + "core/logout",
  //admin
  ADMINDASHBOARD: requestUrl + "arrize/admin/dashboard",

  OTP: requestUrl + "core/generateotp",
  RESETPASSWORD: requestUrl + "core/reset-password",
  SIGN: requestUrl + "user/update/terms-selfie/",

  GRAPH: requestUrl + "core/graphs",
  CONFIRMPAYMENT: requestUrl + "core/confirm/payment",

  PAYMENTGATEWAY: requestUrl + "core/generate-payment-link",

  PAYOUTSPAIRS: requestUrl + "arrize/admin/income/pair",
  PAYOUTSBEGINNERS: requestUrl + "arrize/admin/income/beginners",
  PAYOUTSREPURCHASE: requestUrl + "arrize/admin/income/repurchase",
  PAYOUTSCAREER: requestUrl + "arrize/admin/income/career",
  PAYOUTPERFORMANCE: requestUrl + "arrize/admin/income/performance",
  PAYOUTSRANKS: requestUrl + "arrize/admin/income/rank",

  GENEOLOGY: requestUrl + "core/genelogy",
  OTHERSGENEOLOGY: requestUrl + "core/genelogy",
  TABULARGENEOLOGY: requestUrl + "core/tabular/genelogy",
  GENERATELINK: requestUrl + "user/generate-link",

  SPECIFICUSER: requestUrl + "users?username=",

  TDS: requestUrl + "tds-forms/",
  TDSREPORT: requestUrl + "arrize/admin/generate-tds",
  USERRANKSETTING: requestUrl + "core/bonus",

  ALLUSERS: requestUrl + "all-users",
  USERS: requestUrl + "users?username=ripship",
  NEWUSERS: requestUrl + "users?is_approved=false",
  REJECTEDNEWUSERS: requestUrl + "users?is_rejected=true&is_approved=false",
  FREEUSERS:
    requestUrl +
    "users?is_approved=true&is_distributor=true&free_registration=true&is_blocked=false",
  BLOCKEDFREEUSER:
    requestUrl +
    "users?is_approved=true&is_distributor=true&free_registration=true&is_blocked=true",

  ACTIVECUSTOMERS:
    requestUrl +
    "users?is_approved=true&is_customer=true&free_registration=false&is_blocked=false",
  BLOCKEDACTIVECUSTOMERS:
    requestUrl +
    "users?is_approved=true&is_customer=true&free_registration=false&is_blocked=true",

  BLOCKEDACTIVEUSER:
    requestUrl +
    "users?is_approved=true&free_registration=false&is_customer=true&is_blocked=true",

  ACTIVEDISTRIBUTORS:
    requestUrl +
    "users?is_approved=true&is_distributor=true&free_registration=false&is_blocked=false",
  BLOCKEDDISTRIBUTOR:
    requestUrl +
    "users?is_approved=true&is_distributor=true&free_registration=false&is_blocked=true",

  APPROVEUSER: requestUrl + "arrize/admin/approve-user",
  BLOCKUSER: requestUrl + "arrize/admin/user-access",
  UNBLOCKUSER: requestUrl + "arrize/admin/user-access",
  TRIPS: requestUrl + "trips",

  PACKAGES: requestUrl + "arrize/admin/packages",
  CREATEPACKAGE: requestUrl + "arrize/admin/packages",

  USERPRF: requestUrl + "core/user/profile",

  SETTINGCAREER: requestUrl + "career/",
  SETTINGRANKSANDREWARDS: requestUrl + "rewards/",

  PROMOTIONMATERIAL: requestUrl + "promotions/",

  PENDINGUPGRADEPKGREQ: requestUrl + "orders?approved=false",
  APPROVEDUPGRADEPKG: requestUrl + "orders?approved=true",
  PENDINGREPURPKGREQ: requestUrl + "repurchase?approved=false",
  APPROVEDREPURPKG: requestUrl + "repurchase?approved=true",

  USERPRFIMG: requestUrl + "user/profile-pic",
  //customer register

  PERSONALDETAILS: requestUrl + "user/register/",
  SPONSORDETAILS: requestUrl + "user/register/",
  BANKDETAILS: requestUrl + "user/bankdetails",
  UPLOADDOC: requestUrl + "user/documents",
  FORMPREVIEW: requestUrl + "user/check/user",
  COMPLETEREGISTER: requestUrl + "user/update/terms-selfie/",
  UPDATEUSERDETAILS: requestUrl + "user/details/update",
  UPDATEBANKDETAILS: requestUrl + "user/update/bankdetails/",
  UPDATEKYCDETAILS: requestUrl + "arrize/admin/update/documents",

  REGISTERSTAFF: requestUrl + "register-staff/",
  STAFFUSERS: requestUrl + "register-staff?is_blocked=false",
  BLOCKEDSTAFFUSERS: requestUrl + "register-staff?is_blocked=true",

  //customer dashboard
  DASHBOARD: requestUrl + "user/dashboard",
  USERDETAILS: requestUrl + "core/user/profile",

  //Export to Excel
  EXPORTTOEXCEL: requestUrl + "arrize/admin/download/excel",

  //Approve Documents
  APPROVEDOC: requestUrl + "user/approve/documents",

  // /trips - only for admin to approve the trips

  REPURCHASETRIP:
    requestUrl +
    "user/trip/details?trip__user__username=arrize?trip__approved=True?trip__redeemed=True",

  REPURCHASEINVOICE: requestUrl + "core/invoice/repurchase/",
  UPGRADEINVOICE: requestUrl + "core/invoice/order/",
  UPGRADETRIPINVOICE: requestUrl + "core/invoice/trips/",

  //trip orders
  ORDERREPORT: requestUrl + "orders/",

  UPDATETRIP: requestUrl + "core/update-trip",

  //trip request
  TRIPDETAILS: requestUrl + "user/trip/details",
  REQUESTTRIP: requestUrl + "request/trip/",

  //trip repurchase
  TRIPREPURCHASE: requestUrl + "repurchase/",

  REPURCHASECUSTOMERPACKAGES: requestUrl + "core/packages/customer",

  //trip redemption
  GETREDEEMTRIP: requestUrl + "user/trip/details",

  REDEEMTRIP: requestUrl + "trips/trip_id/",

  REDEEMREWARD: requestUrl + "redeem-reward",

  RTRIP: requestUrl + "redeem/trip/",
  ATRIP: requestUrl + "trips/",

  //customer payouts
  DAILYINCOME: `history/payments`,
  ONHOLDREPORT: "history/payments?paid=false",

  REPURCHASEINCOME: "history/payments?&description=repurchase&paid=true",
  BEGI: "history/payments?user__username=arrize&description=beginners contest?paid=true",
  PAIRMATCH:
    "history/payments?user__username=arrize&description=pair match?paid=true",
  CAREERINCOME: "history/payments?description=career&paid=true",
  PERFORMANCE: "history/payments?description=performance&paid=true",
  RANK: "history/payments?&description=rank&paid=true",
};
