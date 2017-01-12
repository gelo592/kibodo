var kibodo = {
  el: $("#kibodo"),
  controls: false,
  autoplay: false,
  loop: false,
  stackEffects: false,
  currentClip: 1,
  currentHue: 0,
  currentPlaybackRate: 1,
  currentPresetFunction: 'setHue',
  reverse: false,
  paused: false,
  global: false,

  play: function() {
    this.paused = false;
    $("#vid"+this.currentClip)[0].play();
    $("#vid"+this.currentClip).removeClass("paused");
  },

  pause: function() {
    this.paused = true;
    $("#vid"+this.currentClip)[0].pause();
    $("#vid"+this.currentClip).addClass("paused");
  },

  seek: function() {

  },

  currentTime: function () {
    return true;

  },

  duration: function() {
    return true;

  },

  togglePlayPause: function() {
    if(this.paused) {
    $(".pause-key").removeClass("key-pressed-hold");
      this.play();
    }
    else {
    $(".pause-key").addClass("key-pressed-hold");
      this.pause();
    }
  },

  toggleLoop: function() {
    this.loop = !this.loop;
  },

  toggleAutoplay: function() {
    this.autoplay = !this.autoplay;

    if(this.autoplay) {
      this.vid.autoplay = "autoplay";
    }
    else {
      this.vid.autoplay = "";
    }
  },

  changePlaybackSpeed: function(rate) {
    var newRate = this.currentPlaybackRate + parseFloat(rate);
    this.currentPlaybackRate = newRate < .25 ? .25 : newRate > 3 ? 3 : newRate;
    $("#vid"+this.currentClip)[0].playbackRate = this.currentPlaybackRate;
  },

  changePreset: function() {

  },

  applyPreset: function(value) {
    //this.currentPresetFunction(value);

    if(this.currentPresetFunction == "setHue") {
      this.setHue(value);
    }
  },

  startStopRecord: function() {

  },

  clearFilters: function() {
    this.currentHue = 0;
    this.invert = false;
    this.greyscale = false;
    $("#vid"+this.currentClip).css("filter", "");
  },

  rotateHue: function(hue) {
    var newHue = this.currentHue + hue;

    if(!this.stackEffects){this.clearFilters()};
    this.currentHue = newHue;

    $("#vid"+this.currentClip).css("filter", "hue-rotate(" + newHue + "deg)");
  },

  setHue: function(hue) {
    if(!this.stackEffects){this.clearFilters()};
    this.currentHue = hue;

    $("#vid"+this.currentClip).css("filter", "hue-rotate(" + hue + "deg)");
  },

  toggleGrey: function() {
    var tempGrey = !this.greyscale;

    if(!this.stackEffects){this.clearFilters()};
    this.greyscale = tempGrey;

    if(this.greyscale) {
      $("#vid"+this.currentClip).css("filter", "grayscale(1)");
    }
    else {
      $("#vid"+this.currentClip).css("filter", "grayscale(0)");
    }
  },

  toggleInvert: function() {
    var tempInvert = !this.invert;

    if(!this.stackEffects){this.clearFilters()};
    this.invert = tempInvert;

    if(this.invert) {
      $("#vid"+this.currentClip).css("filter", "invert(1)");
    }
    else {
      $("#vid"+this.currentClip).css("filter", "invert(0)");
    }
  },

  toggleReverse: function() {
    var tempReverse = !this.reverse;
    if(!this.stackEffects){this.clearFilters()};
    this.reverse = tempReverse;

    if(this.reverse) {
      $(".reverse-key").addClass("key-pressed-hold");
    }
    else {
      $(".reverse-key").removeClass("key-pressed-hold");
    }

    this.setClip(this.currentClip);
  },

  toggleGlobalMode: function() {
    this.global = !this.global;
  },

  setClip: function(clip) {
    var clipTag = this.reverse ? clip + 'r' : clip;
    if(clip != this.currentClip) {
      this.currentClip = clip;
      $(".video").addClass('video-hid');
      $("#vid"+clipTag).removeClass('video-hid');

      if($("#vid"+clipTag).hasClass("paused")) {
        this.paused = true;
        $(".pause-key").addClass("key-pressed-hold");
      }
      else {
        this.paused = false;
        $(".pause-key").removeClass("key-pressed-hold");
      }
    }
  }
};

$(window).keyup(function(e){
  var keyVal = e.key;

  $(".key").each(function(i,e) {
    var key = $(e).data('key');

    if(key == keyVal) {
      $(e).removeClass("key-pressed");
    }
  });
});

$(window).keydown(function(e){
  var keyVal = e.key;

  $(".key").each(function(i,e){
    var key = $(e).data('key');
    var action = $(e).data('function');
    var data = $(e).data('keystuffs');

    if(key == keyVal) {
      kibodo[action](data);
      $(e).addClass("key-pressed");
    }
  });
});