
// initializers['app_instance'] = function() {
		$('.navbar-header .nav a h4').html('App Instance');
		$.ajax({
			url: '/api/appinstances/'+resource_id,
			success: function(data) {				
				$('#table').html(`
				<div style="margin:21px">
<div class="btn-group pull-right">
  <button type="button" class="btn btn-primary" id="save">Save</button>
  <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span class="caret"></span>
    <span class="sr-only">Toggle Dropdown</span>
  </button>
  <ul class="dropdown-menu">
    <li><a href="/app/`+data.group.slug+'/'+data.slug+`">Visit</a></li>
    <li><a href="javascript:void(0)" id="find">Find on Pages</a></li>
  </ul>
</div>
  <!-- Nav tabs -->
  <ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="active"><a href="#main" aria-controls="home" role="tab" data-toggle="tab">Main</a></li>
    <li id="resoucestab" role="presentation" style="display:none"><a href="#resources" aria-controls="messages" role="tab" data-toggle="tab">Resources</a></li>
		<li id="optionstab" role="presentation" style="display:none"><a href="#options" aria-controls="profile" role="tab" data-toggle="tab">Options</a></li>
		<li id="useroptionstab" role="presentation" style="display:none"><a href="#user_options_default" aria-controls="profile" role="tab" data-toggle="tab">User Default Options</a></li>	
  </ul>

  <!-- Tab panes -->
  <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="main" style="padding-top: 20px;"><div class="row"><div class="col-sm-9 styles"></div>
  	<div class="col-sm-3"></div></div></div>
    <div role="tabpanel" class="tab-pane" id="resources" style="padding-top: 20px;"><div class="row"><div class="col-sm-9 styles"></div>
	<div class="col-sm-3"></div></div></div>
	<div role="tabpanel" class="tab-pane" id="options" style="padding-top: 20px;"><div class="row"><div class="col-sm-9 styles"></div>
  	<div class="col-sm-3"></div></div></div>
	<div role="tabpanel" class="tab-pane" id="user_options_default" style="padding-top: 20px;"><div class="row"><div class="col-sm-9 styles"></div>
  	<div class="col-sm-3"></div></div></div>
  </div>

</div>
				`)
viewTemplate = Hogan.compile('<div class="list-group">{{#items}}<div class="list-group-item"><a target="_blank" href="/page/{{group.slug}}/{{slug}}">{{name}}</a></div>{{/items}}</div>');

					$('#find').on('click', function(){
						$.get('/api/appinstances/'+data.id+'/pages', function(data){
							if(data.length > 0){
								modal({title:'This uApp was found on the following pages', content:viewTemplate.render({items:data})});
							}else{
								modal({title: 'No pages Found', content:'This uApp is not currently placed on any pages.'});
							}
						})
					})			  
				$('#main .col-sm-9').berry({fields: [
					{label: 'Group', name:'group_id', required: true, type:'hidden'},
					{label: 'Name', name:'name', required: true},
        			{label: 'Slug', name:'slug', required: true},
        			{label: 'Icon', name:'icon', required: false,template:'<i class="fa fa-{{value}}"></i>'},
        			{label: 'Public', name:'public', type: 'checkbox',truestate:1,falsestate:0 },
					{label: 'Limit Device', name: 'device', value_key:'index', value:0, options: ['All', 'Desktop Only', 'Tablet and Desktop', 'Tablet and Phone', 'Phone Only']},
					{label: 'App', name:'app_id', required: true, type:'hidden'},
					{name: 'app', type:'hidden'},
					{name: 'id', type:'hidden'}
				],attributes:data, actions:false, name:'main'})
				$('#save').on('click',function(){
					var item = Berries.main.toJSON();
					item.options = Berries.options.toJSON();
					item.user_options_default = Berries.user_options_default.toJSON();
					item.resources = Berries.resources.toJSON().resources;

					$.ajax({url: '/api/appinstances/'+item.id, type: 'PUT', data: item, success:function(){
							toastr.success('', 'Successfully updated App Instance')
						}.bind(this),
						error:function(e) {
							toastr.error(e.statusText, 'ERROR');
						}
					});

				})
				if(data.app.code.forms[0].content){
					$('#optionstab').show();
					var options = $.extend(true,{actions:false}, JSON.parse(data.app.code.forms[0].content)) 
					options.attributes = data.options || {};
					options.attributes.id = data.id;
					options.name = 'options';
					$('#options .col-sm-9').berry(options);
				}
				if(data.app.code.forms[1].content){
					$('#useroptionstab').show();
					var user_options_default = $.extend(true,{actions:false}, JSON.parse(data.app.code.forms[1].content)) 
					user_options_default.attributes = data.user_options_default || {};
					user_options_default.attributes.id = data.id;
					user_options_default.name = 'user_options_default';
					$('#user_options_default .col-sm-9').berry(user_options_default);
				}
				if(data.app.code.resources[0].name !== '') {	
					$('#resoucestab').show();

					var attributes = $.extend(true, [],data.app.code.resources, data.resources);
					$('#resources .col-sm-9').berry({name:'resources', actions:false,attributes: {resources:attributes},fields:[
						{name:'container', label: false,  type: 'fieldset', fields:[

							{"multiple": {"duplicate": false},label: '', name: 'resources', type: 'fieldset', fields:[
								// {label: 'Name',columns:6, enabled:false},
								{label:false, name: 'name',columns:4, type:'raw', template:'<label class="control-label" style="float:right">{{value}}: </lable>'},
								{name: 'endpoint',label:false,columns:8, type: 'select', choices: '/api/groups/'+data.group_id+'/endpoints'}
							]}
						]},
					]} )
				}
			}
		});
// }