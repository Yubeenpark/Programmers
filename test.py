import sys 
from itertools import combinations
import math
input = sys.stdin.readline

n,m = map(int,input().strip().split())

street = []
chicken = []
home =[]

for _ in range(n):
    street.append(list(map(int,input().strip().split())))
    
for i in range(n):
    for j in range(n):
        if street[i][j]==2:
            chicken.append((i,j))
        elif street[i][j]==1:
            home.append((i,j))
test = []

if m != len(chicken):
    select = combinations(chicken,m)
else:
    select = [chicken]

MINS = math.inf
for chi_store in select:
    dist = 0
    for h in home:  #각 집을 돌면서 치킨 거리 구하기
        min_d=math.inf
        for c in chi_store:
            min_d=min(min_d,abs(c[0]-h[0])+abs(c[1]-h[1]))
        dist +=min_d
    MINS = min(dist,MINS)

print(MINS)