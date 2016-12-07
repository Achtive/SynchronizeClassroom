(function() {
    define([], function() {
        return [
            '$scope','httpService','config','params','$routeParams','eventBusService','controllerName','loggingService', 
            function($scope,$httpService,config,params,$routeParams,eventBusService,controllerName,loggingService) {
            	$scope.form = {};
            	
            	$scope.studyClick = function(obj){
            		 var changeControllerData = {
            				url:"aps/content/weike/view/config.json?PK="+obj+"&backtype=1",
        	                  contentName:"content"
        	                }
                 	  eventBusService.publish(controllerName,'appPart.load.content', changeControllerData);
            	}
            	
            	$scope.deleteFavoriteClick = function(obj){
            		$httpService.post(config.deleteURL,{PK:obj}).success(function(data) {
 	           			$scope.find();
 	   	            });
            	}
            	
            	$scope.find= function(){
            		$scope.form.page = JSON.stringify($scope.page);
            		$httpService.post(config.findWeiKeURL,$scope.form).success(function(data) {
	 	           			$scope.weikeList = data.data;
	 	           			//console.log(data.data);
	 	           			PAGE.buildPage($scope,data);
	 	   	        });
            	}
            	PAGE.iniPage($scope);
            	
            	
            	$("#app_bottom a").css("color","#777");
            	$("#app_bottom ."+controllerName).css("color","#337ab7");
            	
            	$("#"+controllerName).on("swipeleft",function(){
            		$scope.open('my');
            	});
            	
            	$("#"+controllerName).on("swiperight",function(){
            		$scope.open('wrongtitle');
            	});
            	
            	
            	$scope.open = function(str){
            		
            		//根据导航节点判断加载模块
            		var changeControllerData = {
          	                  url:'aps/content/'+str+'/config.json',
          	                  contentName:"content",
          	                  data:{}
          	                }
          	        return eventBusService.publish(controllerName,'appPart.load.content', changeControllerData);
            	}
            }
        ];
    });
}).call(this);
