/**
 * Created by akashbabber on 20/05/17.
 */
b2bDb.factory('dataFactory',function () {
    var data = [
        {
            'exchange':'nse',
            'product':'equity',
            'underlying':'hdfc',
            'expiry':'na',
            'type':'na',
            'strike':'na',
            'attr':{
                'ltp':1176.70,
                'change':2.3,
                'open':1145.23,
                'high':1163.32,
                'low':1133.25,
                'prevClose':1147.20
            }
        },
        {
            'exchange':'nfo',
            'product':'future',
            'underlying':'acc',
            'expiry':'15th sep',
            'type':'na',
            'strike':'na',
            'attr':{
                'ltp':2176.70,
                'change':4.3,
                'open':2145.23,
                'high':2163.32,
                'low':2133.25,
                'prevClose':2147.20
            }
        },
        {
            'exchange':'nfo',
            'product':'option',
            'underlying':'icici',
            'expiry':'15th sep',
            'type':'na',
            'strike':'na',
            'attr':{
                'ltp':3176.70,
                'change':5.3,
                'open':3145.23,
                'high':3163.32,
                'low':3133.25,
                'prevClose':3147.20
            }
        }

        ];

    return data;
});