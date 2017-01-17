(function (){

  let sidebarOpened = false
  let button = document.querySelector('#menu')

  button.addEventListener('click',function (e){
    e.stopPropagation()
    e.preventDefault()
    document.body.classList.add('has-sidebar')
    sidebarOpened = true
  })

  document.body.addEventListener('click', function (){
    if(sidebarOpened){
      document.body.classList.remove('has-sidebar')
    }
  })

})()

var width;

window.addEventListener("resize", function(){
  width = document.body.clientWidth;
  if(width>680){
    document.body.classList.remove('has-sidebar')
  }
}, true);
