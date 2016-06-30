/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.ocelot.marshaller;

import java.io.File;
import java.io.StringReader;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import org.ocelotds.marshalling.IJsonMarshaller;
import org.ocelotds.marshalling.exceptions.JsonMarshallingException;
import org.ocelotds.marshalling.exceptions.JsonUnmarshallingException;

/**
 *
 * @author hhfrancois
 */
public class FileMarshaller implements IJsonMarshaller<File>{

	@Override
	public String toJson(File obj) throws JsonMarshallingException {
		return "{\"filename\":\""+obj.getName()+"\",\"path\":\""+obj.getAbsolutePath()+"\",\"exists\":"+obj.exists()+"}";
	}

	@Override
	public File toJava(String json) throws JsonUnmarshallingException {
      File file = null;
      if(null != json) {
         try (JsonReader reader = Json.createReader(new StringReader(json))) {
            JsonObject root = reader.readObject();
            file = new File(root.getString("path"));
         } catch(Throwable t) {
            throw new JsonUnmarshallingException(json);
         }
      }
      return file;
	}
	
}
