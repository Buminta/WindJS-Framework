package Test;

import Test.JSMin.UnterminatedCommentException;
import Test.JSMin.UnterminatedRegExpLiteralException;
import Test.JSMin.UnterminatedStringLiteralException;

import java.io.*;

public class Test {
	public Test() {

	}

	public static void main(String[] args) throws IOException, UnterminatedRegExpLiteralException, UnterminatedCommentException, UnterminatedStringLiteralException {
		
//		String[] arrFile = {
//				"jquery-2.0.3.min.js",
//				"md5.js",
//				"Storage.js",
//				"app.js"
//        };
//		String line = new String();
//		PrintWriter writer = new PrintWriter("D:/all.js", "UTF-8");
//		for (int i = 0; i < arrFile.length; i++) {
//			BufferedReader reader = new BufferedReader(new InputStreamReader(
//				    new FileInputStream("D:\\www\\KTQD\\assets\\js\\"
//							+ arrFile[i]), "UTF-8"));
//			while ((line = reader.readLine()) != null) {
//				writer.println(line);
//				System.out.println(line);
//			}
//			reader.close();
//		}
//		writer.close();


		JSMin jsmin = new JSMin(new FileInputStream("D:\\all.js"), new File("D:\\all-min.js"));
		jsmin.jsmin();


		// ClassBookEncryption cls = new ClassBookEncryption(
		// ClassBookEncryption.RC4);
		// try {
		// System.out.print(cls.encryptString("GK06ENG011"));
		// } catch (Exception e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// }
	}
}
