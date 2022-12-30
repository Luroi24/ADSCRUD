package Api;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Preguntas extends HttpServlet {

    private PrintWriter out;


    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        out = response.getWriter();
        response.setHeader("Cache-control","no-cache");
        response.setContentType("application/json");
        response.addHeader("Access-Control-Allow-Origin", "*");
            StringBuilder json = new StringBuilder();
            json.append("[");            
    try{
        String Driver ="com.mysql.cj.jdbc.Driver";
        String Url = "jdbc:mysql://localhost/dbcolors";
    Class.forName(Driver);
    Connection db = DriverManager.getConnection(Url, "root", "1234");
    Statement s = db.createStatement();    
    
    String Query="SELECT * FROM colors;";
    ResultSet rs=s.executeQuery(Query);
        while(rs.next()){
        String id=rs.getString("columncolors");
        json.append(id);
        }
    }
    catch(ClassNotFoundException | SQLException e){
    e.printStackTrace();
    }
    json.append("]");
    String ans = json.toString();
    for(int i=1;i<ans.length()-1;i++){
            
            if(ans.charAt(i-1) == '}' && ans.charAt(i)=='{'){
                ans = ans.substring(0,i)+','+ans.substring(i);
            }
        
        }
    out.write(ans);
    }
}
