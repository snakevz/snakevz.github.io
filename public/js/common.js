
    angular.module("appProviders", ["ngRoute"])
    .service('doneService',function($location){
        this.done = function(){
            if(Math.random() >= 0.5==true){
                alert("Балланс пополнен!");
                $location.path('/users');
            }else{
                alert("Ошибка!");
            }            
        }
    })
    .config(function($routeProvider,$locationProvider) {
        $routeProvider
        .when("/", {
            templateUrl : "public/components/home.html"
        })
        .when("/pay/:operator", {
            templateUrl : "public/components/pay.html",      
            controller: function($scope,$routeParams,$location,doneService){       
                
                $scope.operator = $routeParams.operator;
                $scope.models = {
                    "phone":{
                      "value":"",
                      "masked":"",
                      "valid":false
                    },
                    "money":{
                      "value":"",
                      "masked":"",
                      "valid":false
                    },
                }
                $scope.model = "phone";
                $scope.clickButton = clickButton;
                $scope.back = back;
                $scope.done = done;

                var dictionary = {
                    "phone":{
                        "maxlength":10,
                        "masked":function(value){
                            return value.replace(/(\d{1,3})(\d{1,3})?(\d{1,2})?(\d{1,2})?/, '+7 ($1) $2 $3 $4');
                        },
                        valid:function(value){
                            var rgx = /^\d{10}$/;
                            return rgx.test(value);
                        }
                    },
                    "money":{
                        "maxlength":4,
                        "masked":function(value){
                            return value.replace(/(\d+)/, '$1 р.');
                        },
                        "valid":function(value){
                            return  1 <= value && value<=1000;
                        }
                    }
                }
                function clickButton(value){
                    if(value===false){
                        removeSym();
                    }else{
                        addSym(value);
                    }
                }
                function addSym(sym){
                    var valueAfter = $scope.models[$scope.model].value + sym;
                    if(valueAfter.length <= dictionary[$scope.model].maxlength){
                        $scope.models[$scope.model].value = valueAfter;
                        updateMasked();
                    }
                }
                function removeSym(){
                    var valueNow = $scope.models[$scope.model].value;
                    if(valueNow.length>0){
                        $scope.models[$scope.model].value = valueNow.substring(0, valueNow.length - 1);
                        updateMasked();
                    } 
                }
                function updateMasked(){
                    $scope.models[$scope.model].masked = dictionary[$scope.model].masked($scope.models[$scope.model].value);
                    $scope.models[$scope.model].valid = dictionary[$scope.model].valid($scope.models[$scope.model].value);
                }
                function back(){
                    $location.path('/users');
                }
                function done(){
                    doneService.done();
                }
            }
        })
        .otherwise({
            redirectTo: '/'
        });
        $locationProvider.hashPrefix('');
    });    