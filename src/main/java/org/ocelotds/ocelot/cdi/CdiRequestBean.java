/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.ocelot.cdi;

import java.io.File;
import org.ocelotds.Constants;
import org.ocelotds.annotations.DataService;
import org.ocelotds.annotations.JsTopic;
import org.ocelotds.annotations.JsTopicName;
import org.ocelotds.messaging.MessageEvent;
import org.ocelotds.messaging.MessageToClient;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import javax.enterprise.event.Event;
import javax.enterprise.inject.Any;
import javax.enterprise.inject.Instance;
import javax.inject.Inject;
import org.ocelotds.context.OcelotContext;
import org.ocelotds.marshalling.annotations.JsonMarshaller;
import org.ocelotds.marshalling.annotations.JsonUnmarshaller;
import org.ocelotds.ocelot.marshaller.FileMarshaller;
import org.ocelotds.ocelot.topic.GlobalTopicAC;
import org.ocelotds.ocelot.objects.MethodException;
import org.ocelotds.ocelot.objects.Result;
import org.ocelotds.ocelot.topic.SpecificTopicAC;
import org.ocelotds.ocelot.topic.MultiSpecificTopicAC;
import org.ocelotds.security.JsTopicAccessController;
import org.ocelotds.security.JsTopicCtrlAnnotationLiteral;

/**
 *
 * @author hhfrancois
 */
@DataService(resolver = Constants.Resolver.CDI)
public class CdiRequestBean {

	@Inject
	private Principal principal;

	private final Random random = new Random();

	@Inject
	private GlobalTopicAC globalTopicAC;

	@Inject
	private OcelotContext ctx;

	@Inject
	@Any
	Instance<JsTopicAccessController> myTopicAccessControllers;
	
	JsTopicAccessController getJsTopicAccessController() {
		return myTopicAccessControllers.select(new JsTopicCtrlAnnotationLiteral("mytopic")).get();
	}

	@Inject
	@Any
	private MultiSpecificTopicAC multiSpecificTopicAC;

	@JsonMarshaller(FileMarshaller.class)
	public File getFile(String path) {
		return new File(path);
	}
	
	public boolean exists(@JsonUnmarshaller(FileMarshaller.class) File file) {
		return file.exists();
	}

	public String getCDIPrincipalName() {
		return principal.getName();
	}

	public void setGlobalTopicAccess(boolean b) {
		globalTopicAC.setAccess(b);
	}

	public void setSpecificTopicAccess(boolean b) {
		((SpecificTopicAC) getJsTopicAccessController()).setAccess(b);
	}

	public void setMultiSpecificTopicAccess(boolean b) {
		multiSpecificTopicAC.setAccess(b);
	}

	public void getVoid() {
	}

	public String getString() {
		return "FOO";
	}

	public int getNum() {
		return 1;
	}

	public Integer getNumber() {
		return 2;
	}

	public boolean getBool() {
		return Boolean.TRUE;
	}

	public Boolean getBoolean() {
		return Boolean.FALSE;
	}

	public Date getDate() {
		return new Date();
	}

	public Result getResult() {
		return Result.getMock();
	}

	public Collection<Integer> getCollectionInteger() {
		Collection<Integer> result = new ArrayList<>();
		result.add(1);
		result.add(2);
		result.add(3);
		result.add(4);
		return result;
	}

	public Collection<Result> getCollectionResult() {
		Collection<Result> result = new ArrayList<>();
		result.add(Result.getMock());
		result.add(Result.getMock());
		result.add(Result.getMock());
		result.add(Result.getMock());
		return result;
	}

	public Collection<Collection<Result>> getCollectionOfCollectionResult() {
		Collection<Collection<Result>> result = new ArrayList<>();
		result.add(getCollectionResult());
		result.add(getCollectionResult());
		result.add(getCollectionResult());
		result.add(getCollectionResult());
		return result;
	}

	public Map<String, Result> getMapResult() {
		Map<String, Result> result = new HashMap<>();
		result.put("1", Result.getMock());
		result.put("2", Result.getMock());
		result.put("3", Result.getMock());
		result.put("4", Result.getMock());
		return result;
	}

	public String methodWithNum(int i) {
		return "methodWithNum_" + i;
	}

	public String methodWithNumber(Integer i) {
		return "methodWithNumber_" + i;
	}

	public String methodWithBool(boolean i) {
		return "methodWithBool_" + i;
	}

	public String methodWithBoolean(Boolean i) {
		return "methodWithBoolean_" + i;
	}

	public String methodWithDate(Date i) {
		return "methodWithDate_" + ((i != null) ? i.getTime() : null);
	}

	public String methodWithResult(Result i) {
		return "methodWithResult_" + ((i != null) ? i.getInteger() : null);
	}

	public String methodWithArrayInteger(Integer[] i) {
		return "methodWithArrayInteger_" + ((i != null) ? i.length : null);
	}

	public String methodWithCollectionInteger(Collection<Integer> i) {
		return "methodWithCollectionInteger_" + ((i != null) ? i.size() : null);
	}

	public String methodWithArrayResult(Result[] i) {
		return "methodWithArrayResult_" + ((i != null) ? i.length : null);
	}

	public String methodWithCollectionResult(Collection<Result> i) {
		return "methodWithCollectionResult_" + ((i != null) ? i.size() : null);
	}

	public String methodWithMapResult(Map<String, Result> i) {
		return "methodWithMapResult_" + ((i != null) ? i.size() : null);
	}

	public String methodWithCollectionOfCollectionResult(Collection<Collection<Result>> i) {
		return "methodWithCollectionOfCollectionResult_" + ((i != null) ? i.size() : null);
	}

	public String methodWithManyParameters(String a, int b, Result c, Collection<String> d) {
		return "methodWithManyParameters a=" + a + " - b=" + b + " - c=" + ((c != null) ? c.getInteger() : null) + " - d:" + ((d != null) ? d.size() : null);
	}

	public void methodThatThrowException() throws MethodException {
		throw new MethodException("message of exception");
	}

	public String methodWithAlmostSameSignature(Integer i) {
		return "Integer";
	}

	public String methodWithAlmostSameSignature(String i) {
		return "String";
	}

	public String methodWithAlmostSameSignature(String i, String s) {
		return "String2";
	}

	@Inject
	@MessageEvent
	Event<MessageToClient> wsEvent;

	public void publish(String topic, int nb) {
		for (int i = 1; i <= nb; i++) {
			MessageToClient messageToClient = new MessageToClient();
			messageToClient.setId(topic);
			messageToClient.setResponse("Message From server " + i);
			wsEvent.fire(messageToClient);
		}
	}

	@JsTopic(value = "GlobalTopic")
	public String sendToGlobalTopic(String message) {
		return message;
	}

	@JsTopic
	public String sendToSpecificTopic(String message, @JsTopicName String topic) {
		return message;
	}

	@JsTopic(value = "string5topic")
	public String sendToString5topic(String message) {
		return message;
	}

	@JsTopic(value = "string5topicBis")
	public String sendToString5topicBis(String message) {
		return message;
	}

	@JsTopic(value = "string10topic")
	public String sendToString10topic(String message) {
		return message;
	}

	public boolean isUserInRole(String role) {
		return ctx.isUserInRole(role);
	}
	
	public String methodWithArgumentgetDs(String getDs) {
		return getDs;
	}
}
