export default function(node) {
  let x;
  let y;
  let width;
  let height;
  let target;

  function updateCoords(event) {
    x = (event.layerX / width).toFixed(2);
    if (x > 1) x = 1; if (x < 0) x = 0;
    y = (event.layerY / height).toFixed(2);
    if (y > 1) y = 1; if (y < 0) y = 0;
    node.dispatchEvent(new CustomEvent('picker', {
			detail: { x, y }
		}));
  }

	function handleMousedown(event) {
        width = event.srcElement.clientWidth;
        height = event.srcElement.clientHeight;
        target = event.target;
 		updateCoords(event)

		window.addEventListener('mousemove', handleMousemove);
		window.addEventListener('mouseup', handleMouseup);
	}

	function handleMousemove(event) {
        updateCoords(event);
	}

	function handleMouseup(event) {
 		updateCoords(event);
		window.removeEventListener('mousemove', handleMousemove);
		window.removeEventListener('mouseup', handleMouseup);
	}

	node.addEventListener('mousedown', handleMousedown);

	return {
		destroy() {
			node.removeEventListener('mousedown', handleMousedown);
		}
	};
}
