angular.module('TwitterFilters', []).filter('range', function($filter) {
	 return function (data, page, size) {
        if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
            var startIndex = (page - 1) * size;
            if (data.length < startIndex) {
                return [];
            } else {
                return $filter('limitTo')(data.splice(startIndex), size);
            }
        } else {
            return data;
        }
    }
}).filter('pageCount', function() {
	return function (data, size) {
        if (angular.isArray(data)) {
            var result = [];
            for (var i = 0; i < Math.ceil(data.length / size) ; ++i) {
                result.push(i);
            }
            return result;
        } else {
            return data;
        }
    }

}).filter('offset', function() {
	return function(input, start) {
    	start = parseInt(start, 10);
    	return input.slice(start);
  	};

}).filter('tweetify', function($sce) {
	return function(text) {
			text = text.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi, '<a href="$1">$1</a>')
            .replace(/(^|\s)@(\w+)/g, '$1<a href="https://twitter.com/$2">@$2</a>').replace(/(^|\s)#(\w+)/g, '$1<a href="https://twitter.com/hashtag/$2?src=hash">#$2</a>');
		return $sce.trustAsHtml(text);
	}
}).filter('relativeTime', function() {
    return function(text) {
            var values = text.split(' ');
            var timeValue = values[1] + ' ' + values[2] + ', ' + values[5] + ' ' + values[3];
            var parsedDate = Date.parse(timeValue);
            var relativeTo = new Date();
            var delta = parseInt((relativeTo.getTime() - parsedDate) / 1000);
                delta = delta + (relativeTo.getTimezoneOffset() * 60);

            if (delta < 60) {
                return 'less than a minute ago';
            } else if (delta < 120) {
                return 'about a minute ago';
            } else if (delta < (60 * 60)) {
                return (parseInt(delta / 60)).toString() + ' minutes ago';
            } else if (delta < (120 * 60)) {
                return 'about an hour ago';
            } else if (delta < (24 * 60 * 60)) {
                return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
            } else if (delta < (48 * 60 * 60)) {
                return '1 day ago';
            } else {
                return (parseInt(delta / 86400)).toString() + ' days ago';
            }
    }   
});