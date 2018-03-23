// if(loaded.code == null){loaded.code = {scripts:[{name:'Main',content:'', disabled: true}],templates:[{name:'Main',content:'', disabled: true}],
// forms:[{name:'Options',content:'', disabled: true},{name:'User Options',content:'', disabled: true}]
// };}
loaded.code = $.extend(true, {scripts:[{name:'Main',content:'', disabled: true}],templates:[{name:'Main',content:'', disabled: true}],
forms:[{name:'Options',content:'', disabled: true},{name:'User Options',content:'', disabled: true}]
},loaded.code)

var attributes= $.extend(true,{},{code:{user_preference_form:"",form:"", css:""}}, loaded);

$('.navbar-header .nav a h4').html(attributes.app.name);//+' <i class="fa fa-pencil"></i>');
// $('.navbar-header .nav a h4').on('click',function(){
//   $().berry({legend:'Update App Name',fields:[{name:'name',label:false, value: attributes.name}]}).on('save', function(){
//       attributes.app.name = this.toJSON().name;
//       $('.navbar-header .nav a h4').html(attributes.app.name+' <i class="fa fa-pencil"></i>');
//       this.trigger('close');
//   });
// })
$('#save').on('click',function() {
  var data = {code:{}};
  data.code.css = Berries.style.toJSON().code.css;
  data.code.resources = _.map(bt.models,'attributes');
  data.code.templates = templatePage.toJSON();
  // var successCompile = false;
  try{
    _.each(data.code.templates, function(partial){
      Ractive.parse(partial.content);
    })
    // if(!this.resourcesForm.validate()){
    //   toastr.error(e.message, e.name);
    //   return false;
    // }
  }catch(e) {
      toastr.error(e.message, e.name);
      return false;
  }



  data.code.scripts = scriptPage.toJSON();
  var temp = formPage.toJSON();
  data.code.forms = formPage.toJSON();
  data.updated_at = attributes.updated_at;
  // data.code.form = temp[0].content;
  // data.code.user_options_form = temp[1].content;
  $.ajax({
    url: '/api/apps/'+attributes.app_id+'/code',
    method: 'put',
    data: data,
    success:function(e) {
      attributes.updated_at = e.updated_at;
      toastr.success('', 'Successfully Saved')
    },
    error:function(e) {
      toastr.error(e.statusText, 'ERROR');
    }
  })
})






				// $('#save').on('click', function(){
				// 		template_errors = templatePage.errors();
				// 		script_errors =scriptPage.errors();
				// 		// debugger;
				// 		css_errors = [];
				// 		if(cssPage.toJSON()[0].content.length>0){
				// 			css_errors =cssPage.errors();
				// 		}
				// 		console.log(css_errors);

				// 		// var compilefail = false;
				// 		// var errors = [];
				// 		_.each(templatePage.toJSON(), function(partial) {
				// 			try{
				// 				Ractive.parse(partial.content);
				// 			}catch(e){
				// 				template_errors.push({
				// 					type: e.name,
				// 					name: partial.name,
				// 					message: e.message
				// 				});
				// 			}
				// 		})
				// 		// template_errors+=errors.length;
				// 		var errorCount = template_errors.length+ script_errors.length+ css_errors.length

				// 										// modal({headerClass:'danger' ,title: e.name+': '+partial.name,content:$('<div>').html(e.message).html()})


				// 		if(!errorCount){
				// 			this.model.sources = _.map(bt.models, function(item){return item.attributes});
				// 			this.model.template =  JSON.stringify(templatePage.toJSON());
				// 			this.model.script = JSON.stringify(scriptPage.toJSON());
				// 			this.model.css = cssPage.toJSON()[0].content;
				// 			this.model.options = {fields: cb.toJSON({})[0]} ;
				// 			// this.model.updated_at = model.updated_at;

				// 			$.ajax({
				// 				url:'/microapps/{{$id}}',
				// 				data: this.model,
				// 				method:'PUT',
				// 				success: function(model){
				// 					this.model = model;
				// 					original = JSON.stringify(_.pick(model, 'sources', 'template', 'script', 'css', 'options', 'updated_at' ))

				// 					toastr.success(model.name +' has been successfully saved.', 'Success!')

				// 				}.bind(this),
				// 				error: function(e){
				// 					toastr.error(e, 'Error on save')
				// 				},
				// 				statusCode: {
				// 			    404: function() {
				// 						toastr.error('You are no longer logged in', 'Logged Out')
				// 			    },
				// 			    409: function(error) {
				// 			    	// debugger;
				// 			    	test = JSON.parse(JSON.parse(error.responseText).error.message);
				// 						toastr.warning('conflict detected', 'NOT SAVED')


				// 						conflictResults = {};

				// 						conflictResults.sources = (JSON.stringify(test.sources) !== JSON.stringify(this.model.sources));
				// 						conflictResults.css = (JSON.stringify(test.css) !== JSON.stringify(this.model.css));
				// 						conflictResults.options = (JSON.stringify(test.options) !== JSON.stringify(this.model.options));
				// 						conflictResults.scripts = (JSON.stringify(test.script) !== JSON.stringify(this.model.script));
				// 						conflictResults.template = (JSON.stringify(test.template) !== JSON.stringify(this.model.template));

				// 						modal({headerClass:'bg-danger' ,title: 'Conflict(s) detected', content: render('conflict', conflictResults)})//, footer:'<div class="btn btn-danger">Force Save</div>'})

				// 			    }.bind(this),
				// 			    401: function() {
				// 						toastr.error('You are not authorized to perform this action', 'Not Authorized')
				// 			    }
				// 			  }
				// 			})
				// 		}else{
				// 			toastr.error('Please correct the compile/syntax errors ('+ errorCount +')', 'Errors Found')
				// 			modal({headerClass:'danger' ,title: 'Syntax Error(s)', content: render('error', {count:errorCount, temp: template_errors, script: script_errors, css: css_errors})})//, footer:'<div class="btn btn-danger">Force Save</div>'})
				// 		}
				// 	}.bind(this))



$('#import').on('click',function() {
    $().berry({name: 'update', inline: true, legend: '<i class="fa fa-cube"></i> Update Microapp',fields: [	{label: 'Descriptor', type: 'textarea'}]}).on('save', function(){
      $.ajax({
        url: '/api/apps/'+attributes.app_id+'/code',
        data: $.extend({force: true, updated_at:''}, JSON.parse(this.toJSON().descriptor)),
        method: 'PUT',
        success: function(){
          Berries.update.trigger('close');
          window.location.reload();
        }
      })
  });
})
$('#publish').on('click',function() {

    $().berry({name: 'publish', inline: true, legend: '<i class="fa fa-cube"></i> Publish Microapp',fields: [	
        {label: 'Summary'},
        {label: 'Description', type: 'textarea'}
      ]}).on('save', function(){
      $.ajax({
        url: '/api/apps/'+attributes.app_id+'/version',
        data: this.toJSON(),
        method: 'PUT',
        success: function(){
          Berries.publish.trigger('close');
          toastr.success('', 'Successfully Published')
        }
      })
  });
})




$(document).keydown(function(e) {
  if ((e.which == '115' || e.which == '83' ) && (e.ctrlKey || e.metaKey))
  {
      e.preventDefault();
      $('#save').click()
  }
  return true;
});

$('.styles').berry({
  actions:false,
  name: 'style',
  autoDestroy:false,
  attributes:attributes,
  inline:true,
  flatten:false,
  fields:[
    {name:'code', label: false,  type: 'fieldset', fields:[
      {label:false, name:'css', type:'ace', mode:'ace/mode/css'},
    ]}
  ]})
  

// var api = '/api/apps'+;
var tableConfig = {
		entries: [25, 50, 100],
		count: 25,
		autoSize: -20,
		container: '.resources',
    edit:true,delete:true,add:true
	}


    		tableConfig.schema = [
          {label: 'Name',name: 'name'},
          {label: 'Fetch', type: 'checkbox',name:'fetch'},
          {label: 'Path',name:'path'},
          {label: 'Cache', type: 'checkbox',name:'cache'},
          {label: 'Modifier',name: 'modifier', type: 'select', options:[{label: 'None', value: 'none'},{label: 'XML', value: 'xml'}, {label: 'CSV', value: 'csv'}]}
				];
				tableConfig.data = attributes.code.resources;
				// tableConfig.click = function(model){window.location.href = '/admin/sites/'+model.attributes.id};
				bt = new berryTable(tableConfig)





  var temp = $(window).height() - $('.nav-tabs').offset().top -77;// - (88+ this.options.autoSize) +'px');

  $('body').append('<style>.ace_editor { height: '+temp+'px; }</style>')
  templatePage = new paged('.templates',{items:attributes.code.templates, label:'Template'});
  scriptPage = new paged('.scripts',{items:attributes.code.scripts, mode:'ace/mode/javascript', label:'Script'});
  formPage = new paged('.forms',{items:attributes.code.forms, mode:'ace/mode/javascript', label:'Form',extra: function(item){

    item.content = this.berry.fields[this.active].toJSON();
    if (!_.some(JSON.parse(item.content||'{}').fields, function(o) { return _.has(o, "fields"); })) {

      modalForm(item.content, item.name, function(){

        var old = formPage.getCurrent();
        
        formPage.update(old.key, JSON.stringify($.extend(true, {}, JSON.parse(old.content||'{}'),{"fields":cb.toJSON({editor:false})[0]}), null, 2 ))
      });
    }else{
      toastr.error('If you would like to continue using the form builder UI you will need to remove any fieldsets', 'Fieldsets Not Supported');
    }
  }});
  // formPage = new paged('.forms',{items:[{name:'Options Form',content:attributes.code.form},{name:'User Options Form',content:attributes.code.user_preference_form}],  mode:'ace/mode/javascript'});


function modalForm(form, name, onSave){

  if(typeof cb === 'undefined'){
    if(typeof form === 'string'){
      form = JSON.parse(form || '{}');
    }
    form = form || {};
    $('#myModal').remove();
    this.onSave = onSave;
    this.ref = $(templates.modal.render({title: 'Form Editor: '+ name}));
    $(this.ref).appendTo('body');
    this.ref.find('.modal-body').html(templates.formEditor.render());
    this.ref.find('.modal-footer').html('<div id="saveForm" class="btn btn-success"><i class="fa fa-check"></i> Save</div>');
    this.ref.on('hide.bs.modal', function(){
      cb.destroy();
      delete cb;
    });
    this.ref.find('#saveForm').on('click', function(){
      this.onSave.call(this)
      this.ref.modal('hide');
      
    }.bind(this))
    this.ref.modal();

    cb = new Cobler({formOptions:{inline:true},formTarget:$('#form'), disabled: false, targets: [document.getElementById('editor')],items:[[]]});
    $('.modal #form').keydown(function(event) {
      switch(event.keyCode) {
        case 27://escape
            event.stopPropagation();
            cb.deactivate();
            return false;
          break;
      }
    });
    list = document.getElementById('sortableList');
    cb.addSource(list);
    cb.on('activate', function(){
      if(list.className.indexOf('hidden') == -1){
        list.className += ' hidden';
      }
      $('#form').removeClass('hidden');
    })
    cb.on('deactivate', function(){
      list.className = list.className.replace('hidden', '');
      $('#form').addClass('hidden');
    })
    document.getElementById('sortableList').addEventListener('click', function(e) {
      cb.collections[0].addItem(e.target.dataset.type);
    })
  }

  if(typeof form !== 'undefined'){
    var temp = $.extend(true, {}, form);
    for(var i in temp.fields){

      temp.fields[i] = Berry.normalizeItem(Berry.processOpts(temp.fields[i]), i);
      switch(temp.fields[i].type) {
        case "select":
        case "radio":
          temp.fields[i].widgetType = 'select';
          break;
        case "checkbox":
          temp.fields[i].widgetType = 'checkbox';
          break;
        default:
          temp.fields[i].widgetType = 'textbox';
      }

    }

    list.className = list.className.replace('hidden', '');
    cb.collections[0].load(temp.fields);
  }
}