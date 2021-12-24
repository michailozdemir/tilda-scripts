  let modal = document.querySelector('#colibri-modal');
  let modalFrame = document.querySelector('#colibri-modal-frame');
  let frameUrl = [];

  buildFrameUrl = function() {
    for (let item in colibriProduct) {
      frameUrl.push(encodeURIComponent(item) + '=' + encodeURIComponent(colibriProduct[item]));
    }
    frameUrl = frameUrl.join('&');
  }

  openColibriModal = function() {
    modal.classList.add('show');
    modalFrame.setAttribute('src', `https://shop.kolibri.net.ua/online-installments/?${frameUrl}`);
  };

  hideColibriModal = function() {
    modal.classList.remove('show');
    modalFrame.setAttribute('src', '');
  }

  modal.addEventListener('click', function(e) {
    hideColibriModal();
  });

  buildFrameUrl();
