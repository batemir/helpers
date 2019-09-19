export const decimalAdjust = (type, value, exp) => {
    // Если степень не определена, либо равна нулю...
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
    }
    // eslint-disable-next-line
    value = +value;
    // eslint-disable-next-line
    exp = +exp;
    // Если значение не является числом, либо степень не является целым числом...
    // eslint-disable-next-line
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    // Сдвиг разрядов
    // eslint-disable-next-line
    value = value.toString().split('e');
    // eslint-disable-next-line
    value = Math[type](+`${value[0]}e${value[1] ? +value[1] - exp : -exp}`);
    // Обратный сдвиг
    // eslint-disable-next-line
    value = value.toString().split('e');
    return +`${value[0]}e${value[1] ? +value[1] + exp : exp}`;
};
