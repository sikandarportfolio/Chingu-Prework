//alert(c)

var colors = new Array(
    [62,35,255],
    [60,255,60],
    [55,35,98],
    [45,175,230],
    [55,0,255],
    [255,128,0]);
  
  var step = 0;
  //color table indices for: 
  // current color left
  // next color left
  // current color right
  // next color right
  var colorIndices = [0,1,2,3];
  
  //transition speed
  var gradientSpeed = 0.001;
  
  function updateGradient()
  {
    
    if ( $===undefined ) return;
    
  var c0_0 = colors[colorIndices[0]];
  var c0_1 = colors[colorIndices[1]];
  var c1_0 = colors[colorIndices[2]];
  var c1_1 = colors[colorIndices[3]];
  
  var istep = 1 - step;
  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  var color1 = "rgb("+r1+","+g1+","+b1+")";
  
  var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  var color2 = "rgb("+r2+","+g2+","+b2+")";
  
   $('#gradient').css({
     background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
      background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
    
    step += gradientSpeed;
    if ( step >= 1 )
    {
      step %= 1;
      colorIndices[0] = colorIndices[1];
      colorIndices[2] = colorIndices[3];
      
      //pick two new target color indices
      //do not pick the same as the current one
      colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
      colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
      
    }
  }
  
  setInterval(updateGradient,10);
  
  
  
  
  
  
  
  
  
  /* codepen only */
  // ------------------------
  var availabilityPicker = function(options) {
    var defaultOptions = {
      numberOfHours: 18,
      startTime: 6,
      days: [1, 1, 1, 1, 1, 1, 1],
      currentAvailability: [],
      container: "container",
      values: "100000000001110000000000000000000000000000001111000000000000000000000000000000000000000000000000000000000000000000000000000001",
      overlayValues: "000000000111000000000000000000000000000000000110000000000000000000000000000000000011110000000000000000000000000000000000000000",
      isReadOnly: false,
      orientation: "h"
    };
  
    var opts = { ...defaultOptions, ...options };
  
    var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    var slots = [];
    var initialSlot;
    var currentSlot;
  
    var state = {
      unselected: 1,
      selected: 2,
      secondarySelected: 3,
      matched: 4
    }
  
    var operationTypes = {
      none: 0,
      add: 1,
      remove: 2
    };
  
    var currentOperation = operationTypes.none;
    var currentElement;
  
    var getCurrentSlot = function() {
      return slots.find(s => s.id === currentElement.id);
    };
  
    var mouseDown = function(e) {
      e.preventDefault();
      var slot = getCurrentSlot();
  
      initialSlot = slot;
      currentSlot = slot;
  
      if (slot.state === state.unselected) {
        slot.element.classList.add("selecting");
        currentOperation = operationTypes.add;
      } else if (slot.state === state.selected) {
        slot.element.classList.add("removing");
        currentOperation = operationTypes.remove;
      }
    };
  
    var mouseOver = function(e) {
      e.preventDefault();
  
      currentElement = e.target;
  
      if (currentOperation === operationTypes.none)
        return;
  
      var slot = getCurrentSlot();
      if (slot.id === currentSlot.id)
        return;
  
      currentSlot = slot;
  
      var minX = Math.min(initialSlot.x, slot.x);
      var maxX = Math.max(initialSlot.x, slot.x);
      var minY = Math.min(initialSlot.y, slot.y);
      var maxY = Math.max(initialSlot.y, slot.y);
  
      for (var i = 0; i < slots.length; i++) {
        var s = slots[i];
        if (s.x < minX || s.x > maxX || s.y < minY || s.y > maxY) {
          s.element.classList.remove("selecting");
          s.element.classList.remove("removing");
        } else if (currentOperation === operationTypes.add) {
          s.element.classList.add("selecting");
        } else if (currentOperation === operationTypes.remove) {
          s.element.classList.add("removing");
        }
      }
    }
  
    var mouseUp = function(e) {
      e.preventDefault();
  
      var slot = getCurrentSlot();
  
      var minX = Math.min(initialSlot.x, slot.x);
      var maxX = Math.max(initialSlot.x, slot.x);
      var minY = Math.min(initialSlot.y, slot.y);
      var maxY = Math.max(initialSlot.y, slot.y);
  
      var slotsToUpdate = slots.filter(s => s.x >= minX && s.x <= maxX && s.y >= minY && s.y <= maxY);
  
      if (currentOperation === operationTypes.add) {
        for (var i = 0; i < slotsToUpdate.length; i++) {
          slotsToUpdate[i].element.classList.add("selected");
          slotsToUpdate[i].element.classList.remove("selecting");
          slotsToUpdate[i].state = state.selected;
        }
      } else if (currentOperation === operationTypes.remove) {
        for (var i = 0; i < slotsToUpdate.length; i++) {
          slotsToUpdate[i].element.classList.remove("selected");
          slotsToUpdate[i].element.classList.remove("removing");
          slotsToUpdate[i].state = state.unselected;
        }
      }
  
      currentOperation = operationTypes.none;
    }
  
    var createDayHeader = function(dayName) {
      var dayHeader = document.createElement("div");
      dayHeader.classList.add("day-header");
      dayHeader.classList.add(opts.orientation);
      dayHeader.innerHTML = dayName;
  
      return dayHeader;
    }
  
    var createTimeSlot = function(dayIndex, timeSlotIndex, initialState) {
      var timeslot = document.createElement("div");
      timeslot.classList.add("time-slot");
      timeslot.classList.add(opts.orientation);
      if (initialState === state.selected) {
        timeslot.classList.add("selected");
      } else if (initialState === state.secondarySelected) {
        timeslot.classList.add("highlighted");
      } else if (initialState === state.matched) {
        timeslot.classList.add("matched");
      }
  
      timeslot.id = dayIndex + "-" + timeSlotIndex;
  
      if (!opts.isReadOnly) {
        timeslot.addEventListener("mousedown", mouseDown);
        timeslot.addEventListener("mouseover", mouseOver);
        document.addEventListener("mouseup", mouseUp);
      }
  
      return timeslot;
    }
  
    var createDay = function(dayIndex) {
      var day = document.createElement("div");
      day.classList.add("day");
      day.classList.add(opts.orientation);
  
      day.appendChild(createDayHeader(days[dayIndex]));
  
      var valueFilter = (e, index) => (index < (dayIndex * 18) + 18) && index >= dayIndex * 18;
      var initialValues = opts.values.split('').filter(valueFilter);
      var matchValues = opts.overlayValues.split('').filter(valueFilter);
     
      for (var i = 0; i < opts.numberOfHours; i++) {
        var initialState = initialValues[i] === "1" ? state.selected : state.unselected;
        var matchedState = matchValues[i] === "1" ? state.selected : state.unselected;
        var actualState;
  
        if (initialState === state.selected && matchedState === state.selected) {
          actualState = state.matched;
        } else if (initialState === state.selected) {
          actualState = state.selected;
        } else if (matchedState === state.selected) {
          actualState = state.secondarySelected;
        } else {
          actualState = state.unselected;
        }
  
        var timeslot = createTimeSlot(dayIndex, i, actualState);
        slots.push({
          id: timeslot.id,
          x: dayIndex,
          y: i,
          state: actualState,
          element: timeslot
        });
  
        day.appendChild(timeslot);
      }
  
      return day;
    }
  
    var createTimeMarkers = function() {
      var container = document.createElement("div");
      container.classList.add("time-markers");
      container.classList.add(opts.orientation);
  
      var formatTime = function(hour) {
        var hour24 = ("0" + hour % 24);
        return hour24.substr(hour24.length - 2, 2) + ":00";
      }
  
      for (var i = 0; i <= opts.numberOfHours; i++) {
        var timeMarker = document.createElement("div");
        timeMarker.classList.add("time-marker");
        timeMarker.classList.add(opts.orientation);
        timeMarker.innerHTML = formatTime(opts.startTime + i);
        container.appendChild(timeMarker);
      }
  
      return container;
    };
    
    var mainContainer = document.getElementById(opts.container);
    var availabilityControlContainer = document.createElement("div");
    availabilityControlContainer.classList.add("availability-control-container");
    
    var flexContainer = document.createElement("div");
  
    flexContainer.classList.add("flex-container");
    flexContainer.classList.add(opts.orientation);
    if (opts.isReadOnly) {
      flexContainer.classList.add("readonly");
    }
  
    flexContainer.appendChild(createTimeMarkers());
  
    for (var i = 0; i < days.length; i++) {
      flexContainer.appendChild(createDay(i));
    }
  
    availabilityControlContainer.appendChild(flexContainer);
    mainContainer.appendChild(availabilityControlContainer);
  
    return {
      getValues: function() {
        var result = "";
        for (var i = 0; i < slots.length; i++) {
          result += slots[i].state === state.selected ? "1" : "0";
        }
  
        return result;
      },
      clear: function() {
        for (var i = 0; i < slots.length; i++) {
          slots[i].state = state.unselected;
          slots[i].element.classList.remove("selected");
        }
      }
    }
  }
  
  availabilityPicker();
  
  
  
  
  
  
  
  
  
  
  
  
  //------------------------