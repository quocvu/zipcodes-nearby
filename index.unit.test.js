const zipcodes = require('./index');

describe('near()', () => {
  test('should find 5 zipcodes', (done) => {
    zipcodes.near('10453', 100000, { datafile: 'test/zipcodes.csv' })
      .then((res) => {
        expect(res.length).toBe(5);

        for (let i = 0; i < 5; i += 1) {
          expect(res[i]).toBe(String(10451 + i));
        }
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('should find 7 zipcodes near zipcode', (done) => {
    zipcodes.near('50453', 100000, { datafile: 'test/zipcodes.csv' })
      .then((res) => {
        expect(res.length).toBe(7);

        for (let i = 0; i < 7; i += 1) {
          expect(res[i]).toBe(String(50451 + i));
        }
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('should find 7 zipcodes near coordinates', (done) => {
    zipcodes.near({ latitude: 40.85, longitude: -77.80 }, 100000, { datafile: 'test/zipcodes.csv' })
      .then((res) => {
        expect(res.length).toBe(7);

        for (let i = 0; i < 7; i += 1) {
          expect(res[i]).toBe(String(50451 + i));
        }
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('should not find any zipcode', (done) => {
    zipcodes.near('90453', 100000, { datafile: 'test/zipcodes.csv' })
      .then((res) => {
        // we should not be here
        expect(true).toBe(false);
        done();
      })
      .catch((err) => {
        // we should be here
        expect(1).ok;
        done()
      });
  });
});
