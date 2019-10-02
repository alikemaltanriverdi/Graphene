@extends('default.admin')
@section('content')

<div>
  <div class="workflow_name"></div>
<!-- Split button -->
<div class="btn-group pull-right">
  <button type="button" class="btn btn-primary" id="save">Save</button>
  <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span class="caret"></span>
    <span class="sr-only">Toggle Dropdown</span>
  </button>
  <ul class="dropdown-menu">
    <li><a href="/admin/workflows/{!! $workflow->workflow_id !!}/developers" target="_blank">Manage Developers</a></li>
    <li role="separator" class="divider"></li>
    <li><a href="/api/workflows/{!! $workflow->workflow_id !!}" target="_blank">Export</a></li>
    <li><a href="#" id="import">Import</a></li>
    <li role="separator" class="divider"></li>
    <li><a href="#" id="versions">Versions</a></li>
    <li><a href="#" id="instances">Instances</a></li>
    <li role="separator" class="divider"></li>
    <li><a href="#" id="publish">Publish (new version)</a></li>
    <!-- <li><a href="#">Visit</a></li> -->
  </ul>
</div>
  <span class="label label-default" style="float:right;margin-right:15px;" id="version"></span>
  <!-- Nav tabs -->
  <ul class="nav nav-tabs" role="tablist">
  <li role="presentation" class="active"><a href="#resources" aria-controls="resources" role="tab" data-toggle="tab"><i class="fa fa-archive"></i> <span class="hidden-xs hidden-sm">Resources<span></a></li>

    <li role="presentation"><a href="#forms" aria-controls="forms" role="tab" data-toggle="tab"><i class="fa fa-check-square-o"></i> <span class="hidden-xs hidden-sm">Forms<span></a></li>
    <!-- <li role="presentation"><a href="#flow" aria-controls="flow" role="tab" data-toggle="tab"><i class="fa fa-code-fork fa-flip-vertical"></i> <span class="hidden-xs hidden-sm">Flow</span></a></li> -->
    <li role="presentation"><a href="#options" aria-controls="options" role="tab" data-toggle="tab"><i class="fa fa-sitemap"></i> <span class="hidden-xs hidden-sm">Flow</span></a></li>
    <li role="presentation"><a href="#map" aria-controls="map" role="tab" data-toggle="tab"><i class="fa fa-table"></i> <span class="hidden-xs hidden-sm">Data Map<span></a></li>
    <li role="presentation"><a href="#templates" aria-controls="templates" role="tab" data-toggle="tab"><i class="fa fa-code"></i> <span class="hidden-xs hidden-sm">Templates</span></a></li>
    <!-- <li role="presentation"><a href="#styles" aria-controls="styles" role="tab" data-toggle="tab"><i class="fa fa-css3"></i> <span class="hidden-xs hidden-sm">Styles</a></span></li> -->
  </ul>

  <!-- Tab panes -->
  <div class="tab-content">
  <div role="tabpanel" class="tab-pane active " id="resources">
      <div class="row"><div class="col-md-12 resources "></div></div></div>
    <div role="tabpanel" class="tab-pane forms" id="forms" style="margin-top:20px">
    <div class="">
      <div class="row">
          <div class="col-md-2 col-sm-8 col-xs-12">
            <div class="panel panel-default">
              <div class="panel-heading">
              <div class="btn-group" role="group" style="margin-bottom:20px" aria-label="...">
                  <a class="btn btn-success" onclick="new gform(_.extend(myform,{name:'modal'}) ).modal().on('cancel',function(e){e.form.trigger('close')})">Preview </a>
                  <a class="btn btn-info" onclick="new gform({legend:'Descriptor',fields:[{type:'textarea',name:'descriptor',size:25,value:JSON.stringify(myform,null,'\t') }]}).modal().on('save',function(e){myform  = JSON.parse(e.form.get('descriptor')); e.form.trigger('close');renderBuilder(); }).on('cancel',function(e){e.form.trigger('close')})">Descriptor </a>
                  <!-- <a class="btn btn-info" href="examples/">Examples</a> -->
                </div>
              </div>
              <div class="panel-body">
           
                <ul id="sortableList" class="list-group">
                    <li class="list-group-item" data-type="input">Input</li>
                    <li class="list-group-item" data-type="collection">Options</li>
                    <li class="list-group-item" data-type="bool">Boolean</li>
                    <li class="list-group-item" data-type="section">Section</li>
                  </ul>			

              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-8 col-xs-12">
            <div class="target"></div>

            <div class="panel panel-primary">
              <div class="panel-body" style="position:relative">
                <form>
                <div id="editor" style="position:relative;z-index:1" class="form-horizontal widget_container cobler_select"></div>
                <div><i class="fa fa-arrow-circle-o-left fa-2x pull-left text-muted"></i>Click or Drop Form Elements HERE</div>
                <style>
                .margin-bottom{margin-bottom:15px !important}
                #editor + div {
    display: none;
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    padding: 11px;
    text-align: center;
    border:dotted 1px #080;
    border-radius:3px;
}

#editor:empty + div{
    display: block;
}
                </style>
                </form>

              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-4 hidden-xs">
            <div class="panel panel-default">

              <div class="panel-body">
                <div class=" source view view_source" id="alt-sidebar">

                  <div id="mainform"></div>				
                  <div id="form"></div>				
                  </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- <div role="tabpanel" class="tab-pane scripts" id="scripts"></div> -->
    <div role="tabpanel" class="tab-pane" id="flow" style="padding-top: 15px">
        <div class="row">

        
          <div class="col-sm-3">
            <ul id="sortableListflow" class="list-group ">
            <li class="list-group-item" data-type="state">State</li>
            </ul>
            <div class="flowform"></div>
          </div>
          <div class="col-sm-5 flow cobler_select cobler_container" id="floweditor"></div>
          <!-- <div class="col-sm-8">
          <style>
          .flow-title {
    z-index: 1;
    top: 50px;
    position: sticky;
    background: #fff;
    margin: -15px -15px 15px;
    padding: 15px 15px 10px;
    border-bottom: solid 1px #eee;
}
</style>
          <div class="panel panel-default">
          <div class="collapsible panel-body">
          <h3 class="flow-title">Signature Authorization Form</h3>

          <div id="myForm" ></div>
          </div>
          </div>
          </div> -->

          <!-- <div class="col-sm-4">
            <div id="flow-preview" style="zoom: 150%;text-align: center;"></div>
          </div> -->
        </div>
      <!-- <div class="row"><div class="col-md-12 map "></div></div> -->
    <!-- </div> -->
    <!-- <div role="tabpanel" class="tab-pane" id="styles">
        
    </div> -->
  </div>
  <div role="tabpanel" class="tab-pane" id="options">
  <div class="options" style="width:0;display:none"></div>

          <div class="col-sm-6">
            <div class="btn btn-success pull-right" style="margin-top:15px" id="add-state" ><i class="fa fa-plus"></i> Add</div>
            <div id="flow-preview" style="zoom: 150%;text-align: center;"></div>
          </div>
          <div class="col-sm-6" id="flow-form">
          </div>
        </div>
  <div role="tabpanel" class="tab-pane" id="map">
    <div class="col-sm-8">
      <div class="map"></div>
    </div>
    <div class="col-sm-4">
    </div>
  </div>
  <div role="tabpanel" class="tab-pane templates" id="templates"></div>

</div>


@endsection

@section('end_body_scripts_top')
  <!-- <script src='//unpkg.com/ractive/ractive.min.js'></script>     -->
  <script src='/assets/js/vendor/ractive.min.js'></script>    

  <script src='/assets/js/paged.js'></script> 
  <script type="text/javascript" src="/assets/js/vendor/sortable.js"></script>
  <script type='text/javascript' src='/assets/js/templates/admin.js'></script>
  <script type='text/javascript' src='/assets/js/cob/cob.js'></script>
  <script type='text/javascript' src='/assets/js/cob/content.cob.js'></script>
  <script type='text/javascript' src='/assets/js/cob/image.cob.js'></script>
  <script type='text/javascript' src='/assets/js/cob/form.cob.js'></script>
  <script type="text/javascript" src="/assets/js/vendor/mermaid.min.js"></script>
  <script>
    mermaid.initialize({
        startOnLoad:false,
        securityLevel: 'loose'
    });

    var insertSvg = function(svgCode, bindFunctions){
      document.querySelector("#flow-preview").innerHTML = svgCode;
    };
    myfunc=function(e){
      graph = mermaid.mermaidAPI.render(gform.getUID(), e, insertSvg);

      
    }
    $('body').keydown(function(event) {
      switch(event.keyCode) {
        case 27://escape
            cb.deactivate();
          break;
      }
    });
</script>
  <!-- <script type='text/javascript' src='/assets/js/cob/uapp.cob.js'></script> -->
@endsection

@section('end_body_scripts_bottom')
  <!--<script>
    var editor = monaco.editor.create(document.getElementById('container'), {
      value: [
        'function x() {',
        '\tconsole.log("Hello world!");',
        '}'
      ].join('\n'),
      language: 'javascript'
    });
  </script>-->
  <script>var loaded = {!! $workflow !!};</script>
  <script src='/assets/js/vendor/moment.js'></script>
  <script src='/assets/js/vendor/moment_datepicker.js'></script>

  <script type='text/javascript' src='/assets/js/vendor/math.min.js'></script>
  <script type='text/javascript' src='/assets/js/vendor/colorpicker.min.js'></script>
  
  <script type='text/javascript' src='/assets/js/editWorkflow.js'></script>
  <script type='text/javascript' src='/assets/js/workflow.cob.js'></script>
@endsection

@section('bottom_page_styles')
  <style>
  fieldset hr{display:none}
  fieldset > legend{font-size: 30px}
  fieldset fieldset legend{    font-size: 21px}
  #myModal .modal-dialog{width:900px}
  </style>
@endsection