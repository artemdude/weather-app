/**
 * Created by Superman on 7/23/2014.
 */

define(['helpers', 'text!templates/chartTemplate.html'], function(helpers, template) {
    return Backbone.View.extend({
        el: '#pressureChartTab',
        initialize: function () {
            this.fetchAndRender();
        },
        fetchAndRender: function(){
            var that = this;
            that.model.fetch({
                success: function () {
                    that.render();
                    that.initChart();
                },
                data: { q: 'London', units: 'metric'}
            });
        },
        render: function () {
            var that = this;
            that.$el.html(_.template(template, that.model.toJSON()));
            return that;
        },
        initChart: function () {
            var that = this;

            helpers.ChartHelper.drawLineChart({
                yLabel: 'Pressure',
                elContainer: that.el.id,
                dataFun: _.bind(that.getChartData, that),
                yFormatter: helpers.ChartHelper.formatter.number,
                xFormatter: helpers.ChartHelper.formatter.time,
                units: 'hpa'
            })
        },
        getChartData: function () {
            var result = [],
                hours = this.model.get('hours');

            for (var i = 0; i < 11; i++) {
                result.push({x: hours[i].date, y: hours[i].pressure });
            }

            return [{
                    values: result,
                    key: 'Pressure',
                    color: '#5cb85c'
            }];
        }
    });
});