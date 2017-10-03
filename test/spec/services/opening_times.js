'use strict';

describe('OpeningTimesService', function () {

    var OpeningTimesService;

    beforeEach(module('berlinVeganMapApp'));
    
    // Initialize the controller and a mock scope
    beforeEach(inject(function (_OpeningTimesService_) {
        OpeningTimesService = _OpeningTimesService_;
    }));

    describe('.isOpen()', function () {
    
        var year = 99;
        var month = 1;
        var day = 1;
        var openingTimeIntervals = [
            { begin: new Date(year, month, day, 12, 0, 0, 0), end: new Date(year, month, day, 16, 0, 0, 0)}, 
            { begin: new Date(year, month, day, 10, 0, 0, 0), end: new Date(year, month, day, 20, 0, 0, 0)}, 
            { begin: new Date(year, month, day, 0, 0, 0, 0), end: new Date(year, month, day, 0, 0, 0, 0)}, 
            { begin: new Date(year, month, day, 10, 0, 0, 0)}, 
            { begin: new Date(year, month, day, 10, 0, 0, 0), end: new Date(year, month, day, 20, 0, 0, 0)}, 
            { begin: new Date(year, month, day, 10, 0, 0, 0), end: new Date(year, month, day, 1, 0, 0, 0)}, 
            { begin: new Date(year, month, day, 10, 0, 0, 0), end: new Date(year, month, day, 1, 0, 0, 0)}
        ];
    
        it('should work for regular opening times on sunday', function () {
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 0, new Date(year, month, day, 11, 0, 0, 0))).toBe(false);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 0, new Date(year, month, day, 11, 59, 59, 999))).toBe(false);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 0, new Date(year, month, day, 12, 0, 0, 0))).toBe(true);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 0, new Date(year, month, day, 14, 0, 0, 0))).toBe(true);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 0, new Date(year, month, day, 15, 59, 59, 999))).toBe(true);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 0, new Date(year, month, day, 16, 0, 0, 0))).toBe(false);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 0, new Date(year, month, day, 23, 0, 0, 0))).toBe(false);
        });
        
        it('should work for regular opening times on monday', function () {
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 1, new Date(year, month, day, 0, 0, 0, 0))).toBe(false);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 1, new Date(year, month, day, 9, 59, 59, 999))).toBe(false);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 1, new Date(year, month, day, 10, 0, 0, 0))).toBe(true);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 1, new Date(year, month, day, 19, 59, 59, 999))).toBe(true);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 1, new Date(year, month, day, 20, 0, 0, 0))).toBe(false);
        });
        
        it('should work for special opening times between friday and saturday', function () {
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 5, new Date(year, month, day, 23, 0, 0, 0))).toBe(true);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 6, new Date(year, month, day, 0, 0, 0, 0))).toBe(true);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 6, new Date(year, month, day, 0, 59, 59, 999))).toBe(true);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 6, new Date(year, month, day, 1, 0, 0, 0))).toBe(false);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 6, new Date(year, month, day, 2, 0, 0, 0))).toBe(false);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 6, new Date(year, month, day, 10, 0, 0, 0))).toBe(true);
        });
        
        it('should work for special opening times between saturday and sunday', function () {
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 6, new Date(year, month, day, 23, 0, 0, 0))).toBe(true);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 6, new Date(year, month, day, 24, 0, 0, 0))).toBe(true);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 0, new Date(year, month, day, 0, 0, 0, 0))).toBe(true);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 0, new Date(year, month, day, 0, 59, 59, 999))).toBe(true);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 0, new Date(year, month, day, 1, 0, 0, 0))).toBe(false);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 0, new Date(year, month, day, 2, 0, 0, 0))).toBe(false);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 0, new Date(year, month, day, 12, 0, 0, 0))).toBe(true);
        });
        
        it('should work when open all day', function () {
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 2, new Date(year, month, day, 0, 0, 0, 0))).toBe(true);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 2, new Date(year, month, day, 1, 0, 0, 0))).toBe(true);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 2, new Date(year, month, day, 12, 0, 0, 0))).toBe(true);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 2, new Date(year, month, day, 23, 0, 0, 0))).toBe(true);
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 2, new Date(year, month, day, 23, 59, 59, 999))).toBe(true);
        });
        
        it('should return false if an opening time is undefined', function () {
            expect(OpeningTimesService.isOpen(openingTimeIntervals, 3, new Date(year, month, day, 3, 0, 0, 0))).toBe(false);
        });
    });
});
