package Api;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Eliminar extends HttpServlet {

    private PrintWriter out;


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        out = response.getWriter();
        response.setHeader("Cache-control","no-cache");
        response.setContentType("application/json");
        response.addHeader("Access-Control-Allow-Origin", "*");
        String ide=request.getParameter("id");
            StringBuilder json = new StringBuilder();
            json.append("[");      
            
            
    try{
        String Driver ="com.mysql.cj.jdbc.Driver";
        String Url = "jdbc:mysql://localhost/dbcolors";
    Class.forName(Driver);
    Connection db = DriverManager.getConnection(Url, "root", "1234");
    String Query="DELETE FROM colors WHERE JSON_EXTRACT(columncolors,'$.id')="+"'"+ide+"'";
    PreparedStatement s = db.prepareStatement(Query);    
    int i=s.executeUpdate();
        if(i>0){
            ide="Se logro";
        }    
       }
    catch(ClassNotFoundException | SQLException e){
    e.printStackTrace();
    }
    out.write(ide);
    }
}
