export default {
    formatDate (cmtDay) {
        let today = new Date();

        let day = cmtDay.getDate();
        let monthIndex = cmtDay.getMonth();
        let year = cmtDay.getFullYear();
        let hours = cmtDay.getHours();
        let minutes = cmtDay.getMinutes();

        let stringDate;
        if (day == today.getDate() && monthIndex == today.getMonth() && year == today.getFullYear()) {
            stringDate = '今天 '+hours + ':' + minutes;
        }else if (day+1 == today.getDate() && monthIndex == today.getMonth() && year == today.getFullYear()){
            stringDate = '昨天 '+hours + ':' + minutes;
        }else if (monthIndex == today.getMonth() && year == today.getFullYear()){
            stringDate = day + '日 '+hours + ':' + minutes;
        }else if (year == today.getFullYear()){
            stringDate = (monthIndex+1)+'月'+day+'日';
        }else{
            stringDate = year+'年'+(monthIndex+1)+'月'+day+'日';
        }
        return stringDate;
    }
}
