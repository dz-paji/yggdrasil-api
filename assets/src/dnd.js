'use strict';

let dom = `
  <div class="box box-success">
    <div class="box-header with-border">
      <h3 class="box-title">快速配置启动器</h3>
    </div><!-- /.box-header -->
    <div class="box-body">
      <p>本站的 Yggdrasil API 认证服务器地址：<code>${ url('api/yggdrasil') }</code></p>
      <p>点击下方按钮复制 API 地址，或者将按钮拖动至启动器的任意界面即可快速添加认证服务器（目前仅支持 HMCL 3.1.74 及以上版本）。</p>
    </div><!-- /.box-body -->
    <div class="box-footer">
      <a id="dnd-button" class="btn btn-primary" draggable="true" data-clipboard-text="${ url('api/yggdrasil') }">将此按钮拖动至启动器</a>
      <a class="btn" target="_blank" href="https://github.com/bs-community/yggdrasil-api/wiki/0x03-%E9%85%8D%E5%90%88-authlib-injector-%E4%BD%BF%E7%94%A8#%EF%B8%8F-%E9%85%8D%E7%BD%AE%E5%90%AF%E5%8A%A8%E5%99%A8">启动器配置教程</a>
    </div>
  </div><!-- /.box -->
`;

$('section.content > .row > .col-md-8').append(dom);

let clipboard = new ClipboardJS('#dnd-button');

clipboard.on('success', e => {
  $('#dnd-button').attr('title', '已复制！').tooltip('show');

  setTimeout(() => $('#dnd-button').tooltip('destroy'), 1000);
});

clipboard.on('error', e => {
  $('#dnd-button').attr('title', '无法访问剪贴板，请手动复制。').tooltip('show');
});

$('body').on('dragstart', '#dnd-button', e => {
  let yggdrasilApiRoot = url('api/yggdrasil');
  let uri = 'authlib-injector:yggdrasil-server:' + encodeURIComponent(yggdrasilApiRoot);

  e.originalEvent.dataTransfer.setData('text/plain', uri);
  e.originalEvent.dataTransfer.dropEffect = 'copy';
});
