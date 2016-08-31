angular.module('qlist', ['ui.router', 'ui.bootstrap'])
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state("main", {
			url: "/",
			templateUrl: "app/templates/main.html",
			controller: 'MainCtrl'
		})
		.state("login", {
			url: "/login",
			templateUrl: "app/templates/login.html",
			controller: 'LoginCtrl'
		})
		.state("register", {
			url: "/register",
			templateUrl: "app/templates/register.html",
			controller: 'RegisterCtrl'
		})
		.state("qform", {
			url: '/qform',
			templateUrl: "app/templates/qform.html",
			controller: 'QformCtrl'
		})
		.state("qlistDetail", {
			url: '/qlist/:id',
			templateUrl: "app/templates/qlistDetail.html",
			controller: 'QListDetailCtrl',
			resolve: {
				qlist: ['$stateParams', 'QlistService', function($stateParams, QlistService) {
					var id = $stateParams.id;

					return QlistService.getQlistById(id);					
				}]
			}
		})
		.state("profile", {
			url: "/profile",
			templateUrl: "app/templates/profile.html",
			controller: 'ProfileCtrl'
		})
		.state("managers", {
			url: "/managers",
			templateUrl: "app/templates/managers.html",
			controller: 'ManagersCtrl'
		});
	})
	.run(function($rootScope, $state, AuthService, AUTH_EVENTS) {
		$rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
			if (!AuthService.isAuthenticated()) {
				if (next.name !== 'login' && next.name !== 'register') {
					event.preventDefault();
					$state.go('login');
				};
			};

			if (AuthService.isAuthenticated()) {
				if (next.name === 'login' || next.name === 'register') {
					event.preventDefault();
				};
			};
		});
	});