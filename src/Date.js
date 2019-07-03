/*
 * c 2016.04.01
 * u 2017.12.05
 * wushufen: 404315887@qq.com
 */

!(function(Date, prototype) {
    /**
     * date format
     *
     * @example
     * 
     * console.log(new Date(2017,11-1,30, 12,30,40).format('yyyy-MM-dd HH:mm:ss'))
     * 
     * @param  {String} format 'yyyy-MM-dd HH:mm:ss E'
     * @return {String}
     */
    prototype.format = function(pattern) {
        pattern = pattern || 'yyyy-MM-dd HH:mm:ss';
        var date = this;
        var map = {
            y: date.getFullYear(),
            M: date.getMonth() + 1,
            d: date.getDate(),
            H: date.getHours(),
            h: function() {
                var h = date.getHours();
                return h > 12 ? h - 12 : h
            }(),
            m: date.getMinutes(),
            s: date.getSeconds(),
            S: date.getMilliseconds()
        }
        for (var key in map) {
            pattern = pattern.replace(RegExp(key + '+', 'g'), function($) {
                var v = map[key] + '',
                    x = (Array($.length).join(0) + v).slice(-$.length);
                return v.length > x.length ? v : x
            })
        }

        return pattern.replace(/E+/g, function() {
            return String(date).match('中国') ?
                '星期' + '日一二三四五六'.charAt(date.getDay()) :
                'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(',')[date.getDay()]
        })
    }

    /**
     * 是否无效日期
     * 
     * @return {Boolean} [description]
     */
    prototype.isInvalid = prototype.isInvalidDate = function() {
        return isNaN(this)
    }

    /**
     * 是否有效日期
     * 
     * @return {Boolean} [description]
     */
    prototype.isValid = prototype.isValidDate = function() {
        return !isNaN(this)
    }

    /**
     * toISOString
     */
    prototype.toISOString = prototype.toISOString || function() {
        return this.getUTCFullYear() +
            '-' + p0(this.getUTCMonth() + 1) +
            '-' + p0(this.getUTCDate()) +
            'T' + p0(this.getUTCHours()) +
            ':' + p0(this.getUTCMinutes()) +
            ':' + p0(this.getUTCSeconds()) +
            '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
            'Z';
    }

    function p0(number) {
        return (number < 10 ? '0' : '') + number
    }

    /**
     * toJSON
     */
    prototype.toJSON = prototype.toJSON || function() {
        return this.toISOString()
    }

    /**
     * date.add____(n)
     * date.diff____(date)
     */
    'FullYear,Month,Date,Hours,Minutes,Seconds,Milliseconds,Time'.replace(/\w+/g, function(w) {
        /**
         * date.add____(n)
         * 
         * @return {Date} - this
         */
        prototype['add' + w] = function(n) {
            this['set' + w](this['get' + w]() + n);
            return this
        }

        /**
         * get set
         */
        prototype[w.toLowerCase()] = function(n) {
            return n === undefined ? this['get' + w]() : (this['set' + w](n), this)
        }

        /**
         * ----
         * 
         * date.diff____(date)
         * 
         * @return {Number}
         */
        prototype['diff' + w] = function(date) {
            var diffs = this.getTime() - date.getTime();
            return this['get' + w]() - date['get' + w]()
        }

    });

    prototype.year = prototype.fullYear = prototype.fullyear

    /**
     * date1.diff(date2, 'd天HH时mm分ss秒SSS')
     * 
     * date1.diff(date2, 'd') => n.nnn
     * 
     * @param  {Date} date
     * @param  {String} pattern
     * @return {String|Number}
     */
    prototype.diff = function(date, pattern) {
        var _date = this;
        var pattern = pattern || 'd天HH时mm分ss秒SSS';
        var diffs = _date - date;
        // console.log(diffs)

        var map = {
            y: 365 * 24 * 60 * 60 * 1000, // !!
            M: 30 * 24 * 60 * 60 * 1000, // !!
            d: 24 * 60 * 60 * 1000,
            H: 60 * 60 * 1000,
            h: 60 * 60 * 1000,
            m: 60 * 1000,
            s: 1000,
            S: 1
        }
        var mapKeys = 'yMdHhmsS'.split('');

        if (pattern.match(/^[yMdHhmsS]$/)) { // date1.diff(date2, 'd') => n.nnn
            return diffs / map[pattern]
        }

        var values = {} // values['H'] = n

        var left = diffs;
        for (var i = 0; i < mapKeys.length; i++) {
            var key = mapKeys[i]; // H
            var div = map[key]; // 60 * 60 * 1000

            if (pattern.match(key)) { // H时
                var v = parseInt(left / div); // n时
                left = left - v * div; // 剩下x毫秒

                values[key] = v; // values['H'] = n
            }
        }

        var str = pattern; // 'd天HH时mm分ss秒SSS'
        for (var key in values) { // key:H
            str = str.replace(RegExp(key + '+', 'g'), function($, $1) { // HH=>n    $: HH
                var value = values[$.substr(0, 1)] + ''; // n    values['H']    HH=>H
                var _value = Array(4).join('0') + value; // 0000n
                _value = _value.substr(-$.length) // 0000n=>0n
                value = value.length > $.length ? value : _value;
                return value;
            })
        }

        return str
    }

    /**
     * [今年第几天]
     * @return {Date}
     */
    prototype.dayOfYear = function () {
        var date = this
        var firstDayOfYear = new Date(this.year(), 0, 1)
        var days = Math.floor( (date - firstDayOfYear) / (24*60*60*1000) ) + 1// +1ms for ceil
        return days
    }

    /**
     * [今年第几周]
     * @return {Date}
     */
    prototype.weekOfYear = function () {
        var date = this
        var firstDayOfYear = new Date(this.year(), 0, 1)
        var offset = firstDayOfYear.date()

        var dayOfYear = this.dayOfYear()

        var weeks = Math.floor( (dayOfYear + offset) / (7) ) + 1
        return weeks
    }

    /**
     * [昨天0点]
     * @return {Date}
     */
    Date.yesterday = function(d) {
        d = d || new Date;
        return new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1)
    }

    /**
     * [今天0点]
     * @return {Date}
     */
    Date.today = function(d) {
        d = d || new Date;
        return new Date(d.getFullYear(), d.getMonth(), d.getDate())
    }

    /**
     * [明天0点]
     * @return {Date}
     */
    Date.tomorrow = function(d) {
        d = d || new Date;
        return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)
    }

    /**
     * [今天第1天]
     * @return {Date}
     */
    Date.thisYear = function() {
        return new Date(new Date().year(), 0, 1)
    }

})(Date, Date.prototype)

// console.log(new Date('xxoo').isValid())
// console.log(new Date().diff(new Date().hours(2)))
// console.log(new Date().weekOfYear())