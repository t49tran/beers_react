import jQuery from 'jquery';

export default function ScrollTo(target) {
  jQuery('html, body').animate({
    scrollTop: target,
  });
}
