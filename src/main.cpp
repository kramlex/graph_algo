#include <iostream>
#include <vector>
#include <set>
using namespace std;

void dfst(int a, vector<pair<int,int>>& v, set<pair<int,int>>  &e, vector<vector<int>> &matrix, set<pair<int,int>> & t) {
    v[a].second = a;
    v[a].first = 1;
    int n = matrix.size();

    int x = a;
    while(v[x].first == 1) {
        bool isExplore = false;
        for(int y = 0; y < matrix.size(); y++){
            if( y != v[x].second && matrix[x][y] == 1  &&  e.find({x,y}) == e.end() ) {
                isExplore = true;
                e.insert({x, y});
                if (v[y].first == 0) {
                    t.insert({x,y});
                    v[y].second = x;
                    v[y].first = 1;
                    x = y;
                    break;
                }
            }
        }
        if(!isExplore){
            v[x].first = 2;
            x = v[x].second;
//            cout << x;
        }
    }
}

int main() {
    int n;
    cin >> n;
    vector<vector<int>> a(n, vector<int>(n,0));

    int t;
    for(int i = 0; i < n; i++){
        for(int j = 0; j < n; j++){
            cin >> t;
            a[i][j] = t;
        }
    }


    for(vector<int>::iterator ptr = a.begin(); )
    for(auto i : a){
        for(auto j : i){
            cout << j << " ";
        }
        cout << endl;
    }

    // 0 - new
    // 1 - open
    // 2 - close
    set<pair<int,int>> investigatedEdges; // edge (x,y)
    vector<pair<int,int>> vertex(n, {0,0});

    set<pair<int,int>> tEdges;

    int start;
    cin >> start;

    dfst(start, vertex, investigatedEdges, a, tEdges);
    cout << "******" << endl;
    for( auto e : tEdges){
        cout << e.first << " " << e.second << endl;
    }

    return 0;
}
