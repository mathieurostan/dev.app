(function (){
  const overlay = document.querySelector('#overlay');


  let sidebarOpened = false
  let button = document.querySelector('#menu')

  button.addEventListener('click',function (e){
    e.stopPropagation()
    e.preventDefault()
    document.body.classList.toggle('has-sidebar')
    overlay.classList.toggle('is-hide');
    if(sidebarOpened){
      sidebarOpened = false;
    }else{
      sidebarOpened = true;
    }
  })

  overlay.addEventListener('click', function (){
    if(sidebarOpened){
      document.body.classList.remove('has-sidebar')
      overlay.classList.add('is-hide');
      sidebarOpened = false
    }
  })

  let width;

  window.addEventListener("resize", function(){
    width = document.body.clientWidth;
    if(width>680 && sidebarOpened){
      document.body.classList.remove('has-sidebar')
      overlay.classList.add('is-hide');
    }
    if(width<680 && sidebarOpened){
      document.body.classList.add('has-sidebar')
      overlay.classList.remove('is-hide');
    }
  }, true);

})()
