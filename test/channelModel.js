import {makePoint, representingInterval, makeGap, makeGapBetween,
  closestLeft, closestRight} from '../client/model/channelModel'
import {makeInterval} from '../client/model/interval'

import {expect} from 'chai'
import wu, {zip} from 'wu'
import R from 'ramda'
import {rnd, range, testCount, eps} from './common'

describe('Channel Model', () => {

  describe('representingInterval', () => {

      describe('CASE: no gap inside interval', () => {
        it('should add closest points to interval', () => {
            const xs =   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                  points = xs.map( x => makePoint(x, 10)),
                  interval = makeInterval(5, 10);

            const actual =  representingInterval(interval, points)

            const expectedXs = [4, 5, 6, 7, 8, 9, 10, 11],
                  exptected =  expectedXs.map( x => makePoint(x, 10));
            expect(actual)
              .to.deep.equal(exptected)
        })


        it('should add only closest right point when interval is left alignment', () => {
          const xs =   [0, 1, 2, 3, 4, 5],
                points = xs.map( x => makePoint(x, 10)),
                interval = makeInterval(0, 3);

          const actual =  representingInterval(interval, points)
          const expectedXs = [0, 1, 2, 3, 4],
                exptected = expectedXs.map( x => makePoint(x, 10));
          expect(actual)
            .to.deep.equal(exptected)
        })

        it('should add only closest keft point when interval is right alignment', () => {
          const xs =   [0, 1, 2, 3, 4, 5],
                points = xs.map( x => makePoint(x, 10)),
                interval = makeInterval(2, 5);

          const actual =  representingInterval(interval, points)
          const expectedXs = [1, 2, 3, 4, 5],
                exptected = expectedXs.map( x => makePoint(x, 10));
          expect(actual)
            .to.deep.equal(exptected)
        })

        it('should not add any point when interval is cover all points', () => {
          const xs =   [0, 1, 2, 3, 4, 5],
                points = xs.map( x => makePoint(x, 10)),
                interval = makeInterval(0, 5);

          const actual =  representingInterval(interval, points)
          expect(actual)
            .to.deep.equal(points)
        })

        it('should add points when there is no points inside interval', () => {
          const xs =   [2, 6, 10, 14],
                points = xs.map( x => makePoint(x, 10)),
                interval = makeInterval(7, 9);

          const actual =  representingInterval(interval, points)
          const expected = [7, 10].map(x => makePoint(x, 10));
          expect(actual)
            .to.deep.equal(expected)
        })

      })

      describe('CASE: gap inside interval', () => {
          const points = [
              makePoint(0, 10),
              makePoint(1, 10),
              makeGapBetween(1, 2),
              makePoint(2, 10),
              makePoint(3, 10)
          ],
          interval = makeInterval(0.5, 2.5);
          const actual = representingInterval(interval, points),
                expected = points;

          // expect(actual)
          //   .to.deep.equal(points)


      })
  })



  describe('closestLeft', () => {
    it('should return exact point', () => {
      const xs =   [0, 1, 2, 3, 4, 5],
            points = xs.map( x => makePoint(x, 10));

      const actual = closestLeft(1, points);
      expect(actual)
         .to.deep.equal(makePoint(1, 10))
    })

    it('should return closest point', () => {
      const xs =   [0, 1, 2, 3, 4, 5],
            points = xs.map( x => makePoint(x, 10));

      const actual = closestLeft(1.5, points);
      expect(actual)
         .to.deep.equal(makePoint(1, 10))
    })

    it('should return null if no any left point', () => {
      const xs =   [0, 1, 2, 3, 4, 5],
            points = xs.map( x => makePoint(x, 10));

      const actual = closestLeft(-1, points);
      expect(actual)
         .to.deep.equal(null)
    })

    it('should return null if points are empty', () => {
      const actual = closestLeft(-1, []);
      expect(actual)
         .to.deep.equal(null)
    })
  })


  describe('closestRight', () => {
    it('should return exact point', () => {
      const xs =   [0, 1, 2, 3, 4, 5],
            points = xs.map( x => makePoint(x, 10));

      const actual = closestRight(1, points);
      expect(actual)
         .to.deep.equal(makePoint(1, 10))
    })

    it('should return closest right point', () => {
      const xs =   [0, 1, 2, 3, 4, 5],
            points = xs.map( x => makePoint(x, 10));

      const actual = closestRight(1.5, points);
      expect(actual)
         .to.deep.equal(makePoint(2, 10))
    })

    it('should return null if no any left point', () => {
      const xs =   [0, 1, 2, 3, 4, 5],
            points = xs.map( x => makePoint(x, 10));

      const actual = closestRight(6, points);
      expect(actual)
         .to.deep.equal(null)
    })

    it('should return null if points are empty', () => {
      const actual = closestRight(-1, []);
      expect(actual)
         .to.deep.equal(null)
    })
  })

})
