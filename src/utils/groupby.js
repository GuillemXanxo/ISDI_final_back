const groupByDate = (trips) =>
  trips.reduce((group, trip) => {
    const { data } = trip;
    // eslint-disable-next-line no-param-reassign
    group[data] = group[data] ?? [];
    group[data].push(trip);
    return group;
  }, {});

export default groupByDate;
