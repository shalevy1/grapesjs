import { extend, bindAll } from 'underscore';
import Backbone from 'backbone';
import SelectComponent from './SelectComponent';
import { CommandObject } from './CommandAbstract';
import Component from '../../dom_components/model/Component';

const $ = Backbone.$;

export default extend({}, SelectComponent, {
  init() {
    bindAll(this, 'startDelete', 'stopDelete', 'onDelete');
    this.hoverClass = this.pfx + 'hover-delete';
    this.badgeClass = this.pfx + 'badge-red';
  },

  enable() {
    var that = this;
    this.$el.find('*').mouseover(this.startDelete).mouseout(this.stopDelete).click(this.onDelete);
  },

  /**
   * Start command
   * @param {Object}  e
   * @private
   */
  startDelete(e: any) {
    e.stopPropagation();
    var $this = $(e.target);

    // Show badge if possible
    if ($this.data('model').get('removable')) {
      $this.addClass(this.hoverClass);
      this.attachBadge($this.get(0));
    }
  },

  /**
   * Stop command
   * @param {Object}  e
   * @private
   */
  stopDelete(e: any) {
    e.stopPropagation();
    var $this = $(e.target);
    $this.removeClass(this.hoverClass);

    // Hide badge if possible
    if (this.badge) this.badge.css({ left: -1000, top: -1000 });
  },

  /**
   * Delete command
   * @param {Object}  e
   * @private
   */
  onDelete(e: any) {
    e.stopPropagation();
    var $this = $(e.target);

    // Do nothing in case can't remove
    if (!$this.data('model').get('removable')) return;

    $this.data('model').destroy();
    this.removeBadge();
    this.clean();
  },

  /**
   * Updates badge label
   * @param   {Object}  model
   * @private
   * */
  updateBadgeLabel(model: Component) {
    this.badge.html('Remove ' + model.getName());
  },
} as CommandObject<{}, { [k: string]: any }>);
