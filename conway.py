#!/usr/bin/env python

import unittest


class Grid(object):

    def __init__(self, cell_list):
        self.cells = cell_list


    def is_alive(self, x, y):
        d = {True:1, False:0}
        return d[(x,y) in self.cells]


    def num_live_neighbors(self, x, y):
        return sum(self.is_alive(i,j) 
            for i in range(x-1, x+2)
            for j in range(y-1, y+2)) - self.is_alive(x,y)
        

    def lives(self, x, y):
        live_now = dict((key, False) for key in range(9))
        dead_now = dict((key, False) for key in range(9))
        live_now[2] = True
        live_now[3] = True
        dead_now[3] = True
        survives = {0:dead_now, 1:live_now}
        return survives[self.is_alive(x,y)][self.num_live_neighbors(x,y)]


    def tick(self):
        new_cells = []
        x_list = [x for (x,y) in self.cells]
        y_list = [y for (x,y) in self.cells]
        for i in range(min(x_list)-1, max(x_list)+2):
            for j in range(min(y_list)-1, max(y_list)+2):
                if self.lives(i,j):
                    new_cells.append((i,j))
        self.cells = new_cells


    def __repr__(self):
        n=4
        rep = [ ['.']*n ] * n
        rep = [ ['.']*n for i in range(n) ]
        for (x,y) in self.cells: rep[x][y] = 'X'
        return ''.join(''.join(cell for cell in row)+'\n' for row in rep)



class TestGrid(unittest.TestCase):
    cell_list = [(2,0), (2,1), (2,2)]
    '''
     t0     t1    t2
    ..x..  ..... ..x..
    ..x..  .xxx. ..x..
    ..x..  ..... ..x..
    .....  ..... .....
    '''

    def setUp(self):
        self.grid = Grid(self.cell_list)

    def test_is_alive(self):
        self.assertEqual(self.grid.is_alive(2,0), 1)
        self.assertEqual(self.grid.is_alive(3,2), 0)

    def test_num_live_neighbors(self):
        self.assertEqual(self.grid.num_live_neighbors(0,0), 0)
        self.assertEqual(self.grid.num_live_neighbors(1,1), 3)
        self.assertEqual(self.grid.num_live_neighbors(5,5), 0)
        self.assertEqual(self.grid.num_live_neighbors(2,2), 1)


    def test_lives(self):
        self.assertFalse(self.grid.lives(0,0))
        self.assertTrue(self.grid.lives(1,1))
        self.assertFalse(self.grid.lives(2,2))
        self.assertTrue(self.grid.lives(2,1))


    def test_tick(self):
        tick_1 = [(1,1), (2,1), (3,1)]
        self.grid.tick()
        self.assertEqual(sorted(self.grid.cells), sorted(tick_1))
        tick_2 = [(2,0), (2,1), (2,2)]
        self.grid.tick()
        self.assertEqual(sorted(self.grid.cells), sorted(tick_2))


def visual_test(cell_list):
    grid = Grid(cell_list)
    print grid
    for i in range(5):
        grid.tick() 
        print grid



if False and __name__ == '__main__':
    visual_test([(0,1), (1,1), (2,1)]) # blinker
    visual_test([(0,0), (2,0), (2,1), (1,1), (1,2)]) # glider
    unittest.main()

