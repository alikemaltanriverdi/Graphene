Cobler.types.Content = function(container){
	function render() {
		return templates['widgets_content'].render(get(), templates);
	}
	function get() {
		item.widgetType = 'Content';
		return item;
	}
	function set(newItem) {
		$.extend(item, newItem);
	}
	var item = {
		title: 'This is the title',
		text: 'Here is some text'
	}
	var fields = {
		Title: {},
		Editor: {type: 'checkbox'},
		a: {name:'text',type: 'contenteditable', label: false, show:{matches:{name:'editor',value:true}},parsable:'show'},
		b: {name:'text',type: 'ace', label: false, show:{matches:{name:'editor',value:false}},parsable:'show',mode: 'ace/mode/handlebars'}
	}
	return {
		fields: fields,
		render: render,
		toJSON: get,
		edit: berryEditor.call(this, container),
		get: get,
		set: set,
	}
}

// Cobler.types.Image = function(container){
// 	function render() {
// 		return templates['widgets_image_header'].render(get(), templates);
// 	}
// 	function get() {
// 		item.widgetType = 'Image';
// 		return item;
// 	}
// 	function toJSON(){
// 		return get();
// 	}
// 	function set(newItem) {
// 		$.extend(item, newItem);
// 	}
// 	var item = {
// 	}
// 	var fields = {
// 		Title: {},
// 		Container: {label: "Container?", type: 'checkbox'},
// 		Image: {},
// 		// Image: {type: 'image_picker', choices: '/images?group_id='+groupID, reference: 'image_filename', value_key: 'image_filename'},
// 		Text: {label: 'Alt Text', required: true}
// 	}
// 	return {
// 		fields: fields,
// 		render: render,
// 		toJSON: toJSON,
// 		edit: berryEditor.call(this, container),
// 		get: get,
// 		set: set,
// 	}
// }


Cobler.types.Image = function(container){
	function render() {
		if(get().images.length >1){
			return templates['widgets_slider'].render(get(), templates);
		}else{
			return templates['widgets_image_header'].render(get(), templates);
		}
	}
	function get() {
		item.widgetType = 'Image';
		return item;
	}
	function toJSON() {
		return get();
	}
	function set(newItem) {
		$.extend(item, newItem);
	}
	var item = {
		images: [{image: '' , url:'', text: '', overlay: ''}]
	}
	var fields = {
		"My Images":{label: false,fields:[
			{label: 'Title'},
			{name:'Container',label: "Container?", type: 'checkbox'},
			{type: 'fieldset',name:"images", label: false, multiple: {duplicate: true}, fields: [
				// { name: 'image', type: 'image_picker', choices: '/images?group_id='+groupID, value_key: 'image_filename', label: 'Image'},
				{ name: 'image', label: 'Image'},
				{ name: 'url', label: 'Link', placeholder: 'http://'},
				{ name: 'window', label: 'New Window?', type: 'checkbox'},
				{ name: 'text', label: 'Alt Text', required: true},
				{ name: 'overlay', label: 'Overlay'}
			]}
		]}
	}
	return {
		fields: fields,
		render: render,
		toJSON: toJSON,
		edit: berryEditor.call(this, container),
		get: get,
		set: set,
		initialize: function(el){$(el).find('.slider').nivoSlider({effect: 'fade'});}
	}
}


Cobler.types.Html = function(container){
	function render() {
		var temp = get();//$.extend(true, {}, get());
		temp.html = temp.html.replace(/<\\\/script>/g, "</script>");
		if(item.container){
			return templates['widgets_html_container'].render(temp, templates);
		}else{
			return templates['widgets_html'].render(temp, templates);
		}
	}
	function get() {
		item.widgetType = 'Html';
		item.html = item.html.replace(/<\/script>/g, "<\\/script>");

		return item;
	}
	function toJSON(){
		return get();
	}
	function set(newItem) {
		$.extend(item, newItem);
		item.html =  item.html.replace(/<\\\/script>/g, "</script>");
	}
	var item = {
		html: ''
	}
	var fields = {
			Container: {label: "Container?", type: 'checkbox'},
			Title: {},
			HTML: {type: 'ace', label:false}
	}
	return {
		fields: fields,
		render: render,
		toJSON: toJSON,
		edit: berryEditor.call(this, container),
		get: get,
		set: set,
		initialize: function(el){
				$(el).html($(el).html())
				$(el).find('[data-toggle="tooltip"]').tooltip();
	    	$(el).find('[data-toggle="popover"]').popover();
		}
	}
}


Berry.btn.submit= {
		label: 'Submit',
		icon:'check',
		id: 'berry-submit',
		modifier: 'success pull-right',
		click: function() {
			if(this.options.autoDestroy) {
				this.on('saved', this.destroy);
			}
			this.trigger('save');
		}
	};
Berry.btn.wait= {
		label: 'Submitting',
		icon:'spinner fa-spin',
		id: 'berry-wait',
		modifier: 'warning pull-right',
		click: function() {
		}
	};


