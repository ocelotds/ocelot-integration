var nbMsgToBroadcast = 500;
ocelotController.cacheManager.clearCache();
QUnit.module("unreachableServices");
QUnit.test(".getVoid()", function (assert) {
	var done = assert.async();
	unreachableServices.getVoid().event(function (evt) {
		assert.equal(evt.type, "FAULT", "" + evt.response.classname + " : " + evt.response.message);
		done();
	});
});
QUnit.module("cdiRequestBean");
QUnit.test(".methodWithNum(bad_arg)", function (assert) {
	var done = assert.async();
	cdiRequestBean.methodWithNum("badarg").event(function (evt) {
		assert.equal(evt.type, "FAULT", "A call with bad arg throw an exception");
		assert.equal(evt.response.classname, "java.lang.NoSuchMethodException", "Method should be not found");
		assert.equal(evt.response.message, "org.ocelotds.ocelot.cdi.CdiRequestBean.methodWithNum", "Message should be the bean name and method name");
		done();
	});
});
QUnit.test(".getVoid()", function (assert) {
	var done = assert.async();
	cdiRequestBean.getVoid().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		done();
	});
});
QUnit.test(".getString()", function (assert) {
	var done = assert.async();
	cdiRequestBean.getString().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.equal(evt.response, "FOO");
		done();
	});
});
QUnit.test(".getNum()", function (assert) {
	var done = assert.async();
	cdiRequestBean.getNum().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.equal(evt.response, 1);
		done();
	});
});
QUnit.test(".getNumber()", function (assert) {
	var done = assert.async();
	cdiRequestBean.getNumber().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.equal(evt.response, 2);
		done();
	});
});
QUnit.test(".getBool()", function (assert) {
	var done = assert.async();
	cdiRequestBean.getBool().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.equal(evt.response, true);
		done();
	});
});
QUnit.test(".getBoolean()", function (assert) {
	var done = assert.async();
	cdiRequestBean.getBoolean().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.equal(evt.response, false);
		done();
	});
});
QUnit.test(".getDate()", function (assert) {
	var done = assert.async();
	var now = new Date();
	setTimeout(function () {
		cdiRequestBean.getDate().event(function (evt) {
			assert.equal(evt.type, "RESULT");
			assert.ok(new Date(evt.response).getDate() === now.getDate(), "Same day...");
			done();
		});
	}, 50);
});
QUnit.test(".getResult()", function (assert) {
	var done = assert.async();
	cdiRequestBean.getResult().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, {"integer": 5});
		done();
	});
});
QUnit.test(".getCollectionInteger()", function (assert) {
	var i, expected = [], done = assert.async();
	for (i = 1; i < 5; i++) {
		expected.push(i);
	}
	cdiRequestBean.getCollectionInteger().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".getCollectionResult()", function (assert) {
	var i, expected = [], done = assert.async();
	for (i = 0; i < 4; i++) {
		expected.push({"integer": 5});
	}
	cdiRequestBean.getCollectionResult().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".getCollectionOfCollectionResult()", function (assert) {
	var i, j, expected = [], done = assert.async();
	for (i = 0; i < 4; i++) {
		var result = [];
		expected.push(result);
		for (j = 0; j < 4; j++) {
			result.push({"integer": 5});
		}
	}
	cdiRequestBean.getCollectionOfCollectionResult().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".getMapResult()", function (assert) {
	var i, expected = {}, done = assert.async();
	for (i = 1; i < 5; i++) {
		expected["" + i] = {"integer": 5};
	}
	cdiRequestBean.getMapResult().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithNum(i)", function (assert) {
	var expected, done = assert.async();
	expected = "methodWithNum_1";
	cdiRequestBean.methodWithNum(1).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithNumber(i)", function (assert) {
	var expected, done = assert.async();
	expected = "methodWithNumber_1";
	cdiRequestBean.methodWithNumber(1).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithBool(true)", function (assert) {
	var expected, done = assert.async();
	expected = "methodWithBool_true";
	cdiRequestBean.methodWithBool(true).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithBool(false)", function (assert) {
	var expected, done = assert.async();
	expected = "methodWithBool_false";
	cdiRequestBean.methodWithBool(false).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithBoolean(false)", function (assert) {
	var expected, done = assert.async();
	expected = "methodWithBoolean_false";
	cdiRequestBean.methodWithBoolean(false).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithBoolean(true)", function (assert) {
	var expected, done = assert.async();
	expected = "methodWithBoolean_true";
	cdiRequestBean.methodWithBoolean(true).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithDate(d)", function (assert) {
	var expected, d, done = assert.async();
	d = new Date();
	expected = "methodWithDate_" + d.getTime();
	cdiRequestBean.methodWithDate(d.getTime()).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithResult(r)", function (assert) {
	var expected, r, done = assert.async();
	r = {"integer": 5};
	expected = "methodWithResult_" + r.integer;
	cdiRequestBean.methodWithResult(r).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithArrayInteger(a)", function (assert) {
	var expected, r, done = assert.async();
	r = [1, 2, 3, 4, 5];
	expected = "methodWithArrayInteger_" + r.length;
	cdiRequestBean.methodWithArrayInteger(r).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithCollectionInteger(c)", function (assert) {
	var expected, r, done = assert.async();
	r = [1, 2, 3, 4, 5];
	expected = "methodWithCollectionInteger_" + r.length;
	cdiRequestBean.methodWithCollectionInteger(r).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithArrayResult(c)", function (assert) {
	var i, expected, r = [], done = assert.async();
	for (i = 0; i < 4; i++) {
		r.push({"integer": 5});
	}
	expected = "methodWithArrayResult_" + r.length;
	cdiRequestBean.methodWithArrayResult(r).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithCollectionResult(c)", function (assert) {
	var i, expected, r = [], done = assert.async();
	for (i = 0; i < 4; i++) {
		r.push({"integer": 5});
	}
	expected = "methodWithCollectionResult_" + r.length;
	cdiRequestBean.methodWithCollectionResult(r).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithMapResult(m)", function (assert) {
	var i, expected, r = {}, done = assert.async();
	for (i = 1; i < 5; i++) {
		r["" + i] = {"integer": 5};
	}
	expected = "methodWithMapResult_4";
	cdiRequestBean.methodWithMapResult(r).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithCollectionOfCollectionResult(c)", function (assert) {
	var i, j, expected, r = [], done = assert.async();
	for (i = 0; i < 4; i++) {
		var result = [];
		r.push(result);
		for (j = 0; j < 4; j++) {
			result.push({"integer": 5});
		}
	}
	expected = "methodWithCollectionOfCollectionResult_" + r.length;
	cdiRequestBean.methodWithCollectionOfCollectionResult(r).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithManyParameters(a, b, c, d)", function (assert) {
	var done = assert.async();
	var a = "text", b = 5, c = {"integer": 5}, d = ["a", "b"];
	var expected = "methodWithManyParameters a=" + a + " - b=" + b + " - c=" + c.integer + " - d:" + d.length;
	cdiRequestBean.methodWithManyParameters(a, b, c, d).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithAlmostSameSignature(s)", function (assert) {
	var expected, done = assert.async();
	expected = "String";
	cdiRequestBean.methodWithAlmostSameSignature("text").event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithAlmostSameSignature(s1, s2)", function (assert) {
	var expected, done = assert.async();
	expected = "String2";
	cdiRequestBean.methodWithAlmostSameSignature("text", "text").event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithAlmostSameSignature(i)", function (assert) {
	var expected, done = assert.async();
	expected = "Integer";
	cdiRequestBean.methodWithAlmostSameSignature(5).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodThatThrowException()", function (assert) {
	var done = assert.async();
	cdiRequestBean.methodThatThrowException().event(function (evt) {
		assert.equal(evt.type, "FAULT");
		assert.notEqual(evt.response.classname.indexOf("MethodException"), -1);
		done();
	});
});
QUnit.test(".onMessage()", function (assert) {
	var timer, done = assert.async(), sub, topic = getGuid();
	cdiRequestBean.setGlobalTopicAccess(true).then(function () {
		sub= subscriberFactory.createSubscriber(topic).event(function (evt) {
			assert.equal(evt.type, "RESULT", "Subscription to '"+topic+"' : ok.");
			assert.equal(evt.response, 1, "One subscriber.");
			cdiRequestBean.publish(topic, 1).event(function (evt) {
				assert.equal(evt.type, "RESULT", "Call publish "+topic+" method : ok.");
			});
		}).message(function (msg) {
			assert.equal(msg, "Message From server 1", "Receive message in '"+topic+"' : ok.");
			sub.unsubscribe().event(function (evt) {
				assert.equal(evt.type, "RESULT", "Unsubscription to '"+topic+"' : ok.");
				window.clearTimeout(timer);
				done();
			});
		});
		assert.equal(sub.topic, topic, "topic name '"+topic+"' is accessible");
	});
	timer = setTimeout(function () {
		assert.equal(0, 1, "Receive 0 messages");
		sub.unsubscribe(topic).event(function (evt) {
			assert.equal(evt.type, "RESULT", "Unsubscription to '"+topic+"' : ok.");
			done();
		});
	}, 500);
});
QUnit.test(".onMessages()", function (assert) {
	var sub, result = 0, expected = nbMsgToBroadcast, done, i, query = location.search, params = query.split("&"), timer, topic = getGuid();
	var checkResult = function() {
		if(timer) clearTimeout(timer);
		assert.equal(result, expected, "Receive " + result + "/" + expected + " messages");
		sub.unsubscribe().event(function (evt) {
			assert.equal(evt.type, "RESULT", "Unsubscription to 'mytopic' : ok.");
			done();
		});
	};
	for (i = 0; i < params.length; i++) {
		var param = params[i].replace("?", "");
		var keyval = param.split("=");
		if (keyval.length === 2) {
			if (keyval[0] === "nbmsg") {
				expected = parseInt(keyval[1]);
			}
		}
	}
	timer = setTimeout(checkResult, 50 * expected);
	done = assert.async();
	cdiRequestBean.setGlobalTopicAccess(true).then(function () {
		sub = subscriberFactory.createSubscriber(topic).event(function (evt) {
			assert.equal(evt.type, "RESULT", "Subscription to '"+topic+"' : ok.");
			cdiRequestBean.publish(topic, expected).event(function (evt) {
				assert.equal(evt.type, "RESULT", "Call publish to '"+topic+"'(" + expected + ") method : ok.");
			});
		}).message(function (msg) {
			result++;
			assert.ok(true, "" + msg + " : (" + result + ")");
			if (result === expected) {
				checkResult();
			}
		});
	});
});
QUnit.test(".testGlobalTopic()", function (assert) {
	var sub, timer, topic = "GlobalTopic", expected = "my message", done = assert.async();
	cdiRequestBean.setGlobalTopicAccess(true).then(function () {
		sub = subscriberFactory.createSubscriber(topic).event(function (evt) {
			assert.equal(evt.type, "RESULT", "Subscription to '" + topic + "' : ok.");
			cdiRequestBean.sendToGlobalTopic(expected).event(function (evt) {
				assert.equal(evt.type, "RESULT", "Call sendToGlobalTopic(" + expected + ") method : ok.");
				sub.message(function (msg) {
					window.clearTimeout(timer);
					assert.equal(msg, expected, "Receive msg in GlobalTopic : " + msg);
					sub.unsubscribe();
					done();
				});
			});
			timer = setTimeout(function () {
				assert.ok(false, "Timeout, didn't receive msg in " + topic + " subscriber.");
				done();
			}, 200);
		});
	});
});
QUnit.test(".testSpecificTopic()", function (assert) {
	var sub, timer, topic = getGuid(), expected = "my message", done = assert.async();
	cdiRequestBean.setGlobalTopicAccess(true).then(function () {
		sub = subscriberFactory.createSubscriber(topic).event(function (evt) {
			assert.equal(evt.type, "RESULT", "Subscription to '" + topic + "' : ok.");
			cdiRequestBean.sendToSpecificTopic(expected, topic).event(function (evt) {
				assert.equal(evt.type, "RESULT", "Call sendToSpecificTopic(" + expected + ", " + topic + ")");
				sub.message(function (msg) {
					window.clearTimeout(timer);
					assert.equal(msg, expected, "Receive msg in SpecificTopic(" + topic + ") : " + msg);
					sub.unsubscribe();
					done();
				});
			});
			timer = setTimeout(function () {
				assert.ok(false, "Timeout, didn't receive msg in " + topic + " subscriber.");
				sub.unsubscribe();
				done();
			}, 200);
		});
	});
});
QUnit.test(".testGlobalTopicAccess()", function (assert) {
	var sub, done = assert.async(), topic = getGuid();
	cdiRequestBean.setGlobalTopicAccess(false).then(function () {
		subscriberFactory.createSubscriber(topic).event(function (evt) {
			assert.equal(evt.type, "FAULT", "Subscription to '"+topic+"' failed : ok.");
			cdiRequestBean.setGlobalTopicAccess(true).then(function() {
				sub = subscriberFactory.createSubscriber(topic).event(function (evt) {
						assert.equal(evt.type, "RESULT", "Subscription to '"+topic+"' : ok.");
						sub.unsubscribe();
						done();
				});
			});
		});
	});
});
QUnit.test(".testSpecificTopicAccess()", function (assert) {
	var sub1, sub2, done = assert.async(), topic = getGuid();
	cdiRequestBean.setGlobalTopicAccess(true).then(function () {
		cdiRequestBean.setSpecificTopicAccess(false).then(function () {
			sub1 = subscriberFactory.createSubscriber(topic).event(function (evt) {
				assert.equal(evt.type, "RESULT", "Subscription to '"+topic+"' : ok.");
				subscriberFactory.createSubscriber("mytopic").event(function (evt) {
					assert.equal(evt.type, "FAULT", "Subscription to '"+"mytopic"+"' failed : ok.");
					cdiRequestBean.setSpecificTopicAccess(true).then(function () {
						sub2 = subscriberFactory.createSubscriber("mytopic").event(function (evt) {
							assert.equal(evt.type, "RESULT", "Subscription to 'mytopic' : ok.");
							sub2.unsubscribe();
							sub1.unsubscribe();
							done();
						});
					});
				});
			});
		});
	});
});
QUnit.test(".testMultiSpecificTopicAccess('mytopic1')", function (assert) {
	var sub, done = assert.async();
	cdiRequestBean.setGlobalTopicAccess(true).then(function () {
		cdiRequestBean.setMultiSpecificTopicAccess(false).then(function () {
			subscriberFactory.createSubscriber("mytopic1").event(function (evt) {
				assert.equal(evt.type, "FAULT", "Subscription to 'mytopic1' failed : ok.");
				cdiRequestBean.setMultiSpecificTopicAccess(true).then(function () {
					sub = subscriberFactory.createSubscriber("mytopic1").event(function (evt) {
						assert.equal(evt.type, "RESULT", "Subscription to 'mytopic1' : ok.");
						sub.unsubscribe();
						done();
					});
				});
			});
		});
	});
});
QUnit.test(".testMultiSpecificTopicAccess('mytopic2')", function (assert) {
	var sub, done = assert.async();
	cdiRequestBean.setGlobalTopicAccess(true).then(function () {
		cdiRequestBean.setMultiSpecificTopicAccess(false).then(function () {
			subscriberFactory.createSubscriber("mytopic2").event(function (evt) {
				assert.equal(evt.type, "FAULT", "Subscription to 'mytopic2' failed : ok.");
				cdiRequestBean.setMultiSpecificTopicAccess(true).then(function () {
					sub = subscriberFactory.createSubscriber("mytopic2").event(function (evt) {
						assert.equal(evt.type, "RESULT", "Subscription to 'mytopic2' : ok.");
						sub.unsubscribe();
						done();
					});
				});
			});
		});
	});
});
QUnit.test(".testMessageAccess()", function (assert) {
	var sub, done = assert.async();
	sub = subscriberFactory.createSubscriber("string5topic").event(function (evt) {
		cdiRequestBean.sendToString5topic("abc");
		cdiRequestBean.sendToString5topic("abcdef");
	}).message(function(msg) {
		assert.equal(msg, "abcdef");
	});
	setTimeout(function() {
		sub.unsubscribe();
		done();
	}, 1000);
});
QUnit.test(".testMessageAccessBis()", function (assert) {
	var sub, done = assert.async();
	sub = subscriberFactory.createSubscriber("string5topicBis").event(function (evt) {
		cdiRequestBean.sendToString5topicBis("abc");
		cdiRequestBean.sendToString5topicBis("abcdef");
	}).message(function(msg) {
		assert.equal(msg, "abcdef");
	});
	setTimeout(function() {
		sub.unsubscribe();
		done();
	}, 1000);
});
QUnit.test(".testMessageAccess10()", function (assert) {
	var sub, done = assert.async();
	sub = subscriberFactory.createSubscriber("string10topic").event(function (evt) {
		cdiRequestBean.sendToString10topic("abc");
		cdiRequestBean.sendToString10topic("abcdefabcdef");
	}).message(function(msg) {
		assert.equal(msg, "abcdefabcdef");
	});
	setTimeout(function() {
		sub.unsubscribe();
		done();
	}, 1000);
});
QUnit.test(".testGetCDIPrincipalName()", function (assert) {
	var login, done = assert.async();
	cdiRequestBean.getCDIPrincipalName().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		login = evt.response;
		assert.notEqual(login, "ANONYMOUS", "login should be different to ANONYMOUS and was "+login);
		done();
	});
});
QUnit.test(".testIsUserInRoleTrue()", function (assert) {
	var done = assert.async();
	cdiRequestBean.isUserInRole("USERR").event(function (evt) {
		assert.equal(evt.type, "RESULT", "User should be in role : USERR");
		assert.equal(evt.response, true);
		done();
	});
});
QUnit.test(".testIsUserInRoleFalse()", function (assert) {
	var done = assert.async();
	cdiRequestBean.isUserInRole("ADMINR").event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.equal(evt.response, false);
		done();
	});
});	
QUnit.test(".getFile()", function (assert) {
	var done = assert.async();
	cdiRequestBean.getFile("/tmp/file").event(function (evt) {
		assert.equal(evt.type, "RESULT");
		var file = evt.response;
		assert.equal(file.filename, "file");
		var exists = file.exists;
		cdiRequestBean.exists(file).event(function (evt) {
			assert.equal(evt.type, "RESULT");
			var res = evt.response;
			assert.equal(res, exists);
			done();
		});
	});
});
/**
 * WithConstraintBean
 */
QUnit.module("withConstraintBean");
QUnit.test(".methodWithValidationArgumentsTest()", function (assert) {
	var done = assert.async();
	withConstraintBean.methodWithValidationArguments(null, "foo", null).event(function (evt) {
		assert.equal(evt.type, "CONSTRAINT");
		var constraints = evt.response;
		assert.equal(constraints.length, 2);
		var c = constraints[0];
		if(c.index===0) {
			assert.equal(c.index, 0);
			assert.equal(c.name, 'arg0');
			c = constraints[1];
			assert.equal(c.index, 2);
			assert.equal(c.name, 'arg2');
		} else {
			assert.equal(c.index, 2);
			assert.equal(c.name, 'arg2');
			c = constraints[1];
			assert.equal(c.index, 0);
			assert.equal(c.name, 'arg0');
		}
		done();
	});
});	
QUnit.test(".methodWithArgumentNotNullTest()", function (assert) {
	var done = assert.async();
	withConstraintBean.methodWithArgumentNotNull("foo").event(function (evt) {
		assert.equal(evt.type, "RESULT");
		withConstraintBean.methodWithArgumentNotNull(null).event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			done();
		});
	});
});	
QUnit.test(".methodWithArgumentNullTest()", function (assert) {
	var done = assert.async();
	withConstraintBean.methodWithArgumentNull(null).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		withConstraintBean.methodWithArgumentNull("foo").event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			done();
		});
	});
});	
QUnit.test(".methodWithArgumentMaxTest()", function (assert) {
	var done = assert.async();
	withConstraintBean.methodWithArgumentMax(8).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		withConstraintBean.methodWithArgumentMax(15).event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			done();
		});
	});
});	
QUnit.test(".methodWithArgumentMinTest()", function (assert) {
	var done = assert.async();
	withConstraintBean.methodWithArgumentMin(15).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		withConstraintBean.methodWithArgumentMin(8).event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			done();
		});
	});
});	
QUnit.test(".methodWithArgumentFalseTest()", function (assert) {
	var done = assert.async();
	withConstraintBean.methodWithArgumentFalse(false).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		withConstraintBean.methodWithArgumentFalse(true).event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			done();
		});
	});
});	
QUnit.test(".methodWithArgumentTrueTest()", function (assert) {
	var done = assert.async();
	withConstraintBean.methodWithArgumentTrue(true).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		withConstraintBean.methodWithArgumentTrue(false).event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			done();
		});
	});
});	
QUnit.test(".methodWithArgumentFutureTest()", function (assert) {
	var done = assert.async();
	var fut = new Date();
	var past = new Date();
	fut.setMonth(fut.getMonth()+1);
	past.setMonth(past.getMonth()-1);
	withConstraintBean.methodWithArgumentFuture(fut.getTime()).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		withConstraintBean.methodWithArgumentFuture(past.getTime()).event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			done();
		});
	});
});	
QUnit.test(".methodWithArgumentPastTest()", function (assert) {
	var done = assert.async();
	var fut = new Date();
	var past = new Date();
	fut.setMonth(fut.getMonth()+1);
	past.setMonth(past.getMonth()-1);
	withConstraintBean.methodWithArgumentPast(past.getTime()).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		withConstraintBean.methodWithArgumentPast(fut.getTime()).event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			done();
		});
	});
});	
QUnit.test(".methodWithArgumentDecimalMaxTest()", function (assert) {
	var done = assert.async();
	withConstraintBean.methodWithArgumentDecimalMax(20).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		withConstraintBean.methodWithArgumentDecimalMax(60).event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			done();
		});
	});
});	
QUnit.test(".methodWithArgumentDecimalMinTest()", function (assert) {
	var done = assert.async();
	withConstraintBean.methodWithArgumentDecimalMin(60).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		withConstraintBean.methodWithArgumentDecimalMin(20).event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			done();
		});
	});
});	
QUnit.test(".methodWithArgumentPatternTest()", function (assert) {
	var done = assert.async();
	withConstraintBean.methodWithArgumentPattern("123456").event(function (evt) {
		assert.equal(evt.type, "RESULT");
		withConstraintBean.methodWithArgumentPattern("123a456").event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			done();
		});
	});
});
QUnit.test(".methodWithArgumentConstraintTest()", function (assert) {
	var done = assert.async();
	withConstraintBean.methodWithArgumentConstraint({"name":"foo"}).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		withConstraintBean.methodWithArgumentConstraint({}).event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			assert.equal(constraints[0].name, "arg0");
			assert.equal(constraints[0].prop, "name");
			done();
		});
	});
});
QUnit.test(".methodWithArgumentSize2_10Test()", function (assert) {
	var done = assert.async();
	withConstraintBean.methodWithArgumentSize2_10("azerty").event(function (evt) {
		assert.equal(evt.type, "RESULT");
		withConstraintBean.methodWithArgumentSize2_10("qwertyuiop^").event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			assert.equal(constraints[0].name, "arg0");
			done();
		});
	});
});
QUnit.test(".methodWithArgumentDigits3_2Test()", function (assert) {
	var done = assert.async();
	withConstraintBean.methodWithArgumentDigits3_2(123.45).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		withConstraintBean.methodWithArgumentDigits3_2(1432432.34).event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			assert.equal(constraints[0].name, "arg0");
			withConstraintBean.methodWithArgumentDigits3_2(432.3423434).event(function (evt) {
				assert.equal(evt.type, "CONSTRAINT");
				var constraints = evt.response;
				assert.equal(constraints.length, 1);
				assert.equal(constraints[0].name, "arg0");
				done();
			});
		});
	});
});
/**
 * CacheServices
 */
QUnit.module("cacheServices");
QUnit.test(".methodCached()", function (assert) {
	var expected, done = assert.async();
	cacheServices.methodCached().event(function (evt) {
		expected = evt.response;
		assert.equal(evt.type, "RESULT", "Receive result : " + JSON.stringify(expected) + " from server and put in cache.");
		cacheServices.methodCached().event(function (evt) {
			assert.deepEqual(evt.response, expected, "Receive result from cache : " + JSON.stringify(evt.response)+" expected : "+JSON.stringify(expected));
			done();
		});
	});
});
QUnit.test(".methodRemoveCache()", function (assert) {
	ocelotController.cacheManager.clearCache();
	var expected, done = assert.async();
	cacheServices.methodCached().event(function (evt) {
		expected = evt.response;
		assert.equal(evt.type, "RESULT", "Receive result : " + JSON.stringify(expected) + " from server and put in cache.");
		cacheServices.methodCached().event(function (evt) {
			assert.deepEqual(evt.response, expected, "Receive result from cache : " + JSON.stringify(evt.response)+" expected : "+JSON.stringify(expected));
			cacheServices.methodRemoveCache().event(function (evt) {
				assert.equal(evt.type, "RESULT", "Cache removed.");
				cacheServices.methodCached().event(function (evt) {
					assert.notDeepEqual(evt.response, expected, "Receive result " + JSON.stringify(evt.response) + " from server and previously : "+JSON.stringify(expected)+" must be different");
					done();
				});
			});
		});
	});
});
QUnit.test(".methodRemoveCache()", function (assert) {
	ocelotController.cacheManager.clearCache();
	var expected, done = assert.async();
	cacheServices.methodCached().event(function (evt) {
		expected = evt.response;
		assert.equal(evt.type, "RESULT", "Receive result : " + JSON.stringify(expected) + " from server and put in cache.");
		cacheServices.methodCached().event(function (evt) {
			assert.deepEqual(evt.response, expected, "Receive result from cache : " + JSON.stringify(evt.response)+" expected : "+JSON.stringify(expected));
			cacheServices.removeCacheFromBusiness().event(function (evt) {
				assert.equal(evt.type, "RESULT", "Cache removed.");
				cacheServices.methodCached().event(function (evt) {
					assert.notDeepEqual(evt.response, expected, "Receive result " + JSON.stringify(evt.response) + " from server and previously : "+JSON.stringify(expected)+" must be different");
					done();
				});
			});
		});
	});
});
QUnit.test(".methodRemovesCache()", function (assert) {
	ocelotController.cacheManager.clearCache();
	var expected, done = assert.async();
	cacheServices.methodCached().event(function (evt) {
		expected = evt.response;
		assert.equal(evt.type, "RESULT", "Receive result : " + JSON.stringify(expected) + " from server and put in cache.");
		cacheServices.methodCached().event(function (evt) {
			assert.deepEqual(evt.response, expected, "Receive result from cache : " + JSON.stringify(evt.response)+" expected : "+JSON.stringify(expected));
			cacheServices.methodRemovesCache({"integer":4}).event(function (evt) { // arg not considerate for this method
				assert.equal(evt.type, "RESULT", "Cache removed.");
				cacheServices.methodCached().event(function (evt) {
					assert.notDeepEqual(evt.response, expected, "Receive result " + JSON.stringify(evt.response) + " from server and previously : "+JSON.stringify(expected)+" must be different");
					done();
				});
			});
		});
	});
});
QUnit.test(".methodCachedWithArg()", function (assert) {
	var expected, done = assert.async();
	cacheServices.methodCachedWithArg({"integer":5}).event(function (evt) {
		expected = evt.response;
		assert.equal(evt.type, "RESULT", "Receive result : " + JSON.stringify(expected) + " from server and put in cache.");
		cacheServices.methodCachedWithArg({"integer":5}).event(function (evt) {
			assert.deepEqual(evt.response, expected, "Receive result from cache : " + JSON.stringify(evt.response)+" expected : "+JSON.stringify(expected));
			cacheServices.methodCachedWithArg({"integer":4}).event(function (evt) { // other key
				assert.notDeepEqual(evt.response, expected, "Receive result " + JSON.stringify(evt.response) + " from server and previously : "+JSON.stringify(expected)+" must be different");
				done();
			});
		});
	});
});
QUnit.test(".methodRemoveCacheWithArg()", function (assert) {
	ocelotController.cacheManager.clearCache();
	var expected, done = assert.async();
	cacheServices.methodCachedWithArg({"integer":5}).event(function (evt) {
		expected = evt.response;
		assert.equal(evt.type, "RESULT", "Receive result : " + JSON.stringify(expected) + " from server and put in cache.");
		cacheServices.methodRemoveCacheWithArg(4, 1).event(function (evt) {
			assert.equal(evt.type, "RESULT", "Another Cache removed.");
			cacheServices.methodCachedWithArg({"integer":5}).event(function (evt) {
				assert.deepEqual(evt.response, expected, "Receive result from cache : " + JSON.stringify(evt.response)+" expected : "+JSON.stringify(expected));
				cacheServices.methodRemoveCacheWithArg(5, 1).event(function (evt) {
					assert.equal(evt.type, "RESULT", "Cache removed.");
					cacheServices.methodCachedWithArg({"integer":5}).event(function (evt) {
						assert.notDeepEqual(evt.response, expected, "Receive result " + JSON.stringify(evt.response) + " from server and previously : "+JSON.stringify(expected)+" must be different");
						done();
					});
				});
			});
		});
	});
});
QUnit.test(".methodRemoveAllCacheResultOfMethod()", function (assert) {
	ocelotController.cacheManager.clearCache();
	var expected1, expected2, done = assert.async();
	cacheServices.methodCachedWithArg({"integer":5}).event(function (evt) {
		expected1 = evt.response;
		assert.equal(evt.type, "RESULT", "Receive result : " + JSON.stringify(expected1) + " from server and put in cache.");
		cacheServices.methodCachedWithArg({"integer":5}).event(function (evt) {
			assert.deepEqual(evt.response, expected1, "Receive result from cache : " + JSON.stringify(evt.response)+" expected : "+JSON.stringify(expected1));
			cacheServices.methodCachedWithArg({"integer":4}).event(function (evt) {
				expected2 = evt.response;
				assert.equal(evt.type, "RESULT", "Receive result : " + JSON.stringify(expected2) + " from server and put in cache.");
				cacheServices.methodCachedWithArg({"integer":4}).event(function (evt) {
					assert.deepEqual(evt.response, expected2, "Receive result from cache : " + JSON.stringify(evt.response)+" expected : "+JSON.stringify(expected2));
					cacheServices.methodRemoveAllCacheResultOfMethod().event(function (evt) {
						assert.equal(evt.type, "RESULT", "Cache removed.");
						cacheServices.methodCachedWithArg({"integer":5}).event(function (evt) {
							assert.notDeepEqual(evt.response, expected1, "Receive result " + JSON.stringify(evt.response) + " from server and previously : "+JSON.stringify(expected1)+" must be different");
							cacheServices.methodCachedWithArg({"integer":4}).event(function (evt) {
								assert.notDeepEqual(evt.response, expected2, "Receive result " + JSON.stringify(evt.response) + " from server and previously : "+JSON.stringify(expected2)+" must be different");
								done();
							});
						});
					});
				});
			});
		});
	});
});
QUnit.test(".methodRemovesCacheWithArgs()", function (assert) {
	ocelotController.cacheManager.clearCache();
	var expected, done = assert.async();
	cacheServices.methodCachedWithArg({"integer":5}).event(function (evt) {
		expected = evt.response;
		assert.equal(evt.type, "RESULT", "Receive result : " + JSON.stringify(expected) + " from server and put in cache.");
		cacheServices.methodRemovesCache({"integer":4}).event(function (evt) {
			assert.equal(evt.type, "RESULT", "Another Cache removed.");
			cacheServices.methodCachedWithArg({"integer":5}).event(function (evt) {
				assert.deepEqual(evt.response, expected, "Receive result from cache : " + JSON.stringify(evt.response)+" expected : "+JSON.stringify(expected));
				cacheServices.methodRemovesCache({"integer":5}).event(function (evt) {
					assert.equal(evt.type, "RESULT", "Cache removed.");
					cacheServices.methodCachedWithArg({"integer":5}).event(function (evt) {
						assert.notDeepEqual(evt.response, expected, "Receive result " + JSON.stringify(evt.response) + " from server and previously : "+JSON.stringify(expected)+" must be different");
						done();
					});
				});
			});
		});
	});
});
QUnit.test(".methodRemoveAllCache()", function (assert) {
	ocelotController.cacheManager.clearCache();
	var expected, done = assert.async();
	cacheServices.methodCached().event(function (evt) {
		expected = evt.response;
		assert.equal(evt.type, "RESULT", "Receive result : " + JSON.stringify(expected) + " from server and put in cache.");
		cacheServices.methodCached().event(function (evt) {
			assert.deepEqual(evt.response, expected, "Receive result from cache : " + JSON.stringify(evt.response)+" expected : "+JSON.stringify(expected));
			cacheServices.methodRemoveAllCache().event(function (evt) {
				assert.equal(evt.type, "RESULT", "All Cache removed.");
				cacheServices.methodCached().event(function (evt) {
					assert.notDeepEqual(evt.response, expected, "Receive result " + JSON.stringify(evt.response) + " from server and previously : "+JSON.stringify(expected)+" must be different");
					done();
				});
			});
		});
	});
});
/**
 * CDISessionBEan
 */
QUnit.module("cdiSessionBean");
QUnit.test(".getValue()", function (assert) {
	var res, done = assert.async();
	cdiSessionBean.getValue().event(function (evt) {
		assert.equal(evt.type, "RESULT", "Result : "+evt.response);
		res = evt.response;
		cdiSessionBean.getValue().event(function (evt) {
			assert.equal(evt.type, "RESULT");
			assert.equal(res+1, evt.response, "Result is increase each call : "+evt.response);
			cdiSessionBean.getValue().event(function (evt) {
				assert.equal(evt.type, "RESULT");
				assert.equal(res+2, evt.response, "Result is increase each call : "+evt.response);
				done();
			});
		});
	});
});
QUnit.module("cdiSingletonBean");
QUnit.test(".getValue()", function (assert) {
	var res, done = assert.async();
	cdiSingletonBean.getValue().event(function (evt) {
		assert.equal(evt.type, "RESULT", "Result : "+evt.response);
		res = evt.response;
		cdiSingletonBean.getValue().event(function (evt) {
			assert.equal(evt.type, "RESULT");
			assert.equal(res+1, evt.response, "Result is increase each call : "+evt.response);
			cdiSingletonBean.getValue().event(function (evt) {
				assert.equal(evt.type, "RESULT");
				assert.equal(res+2, evt.response, "Result is increase each call : "+evt.response);
				done();
			});
		});
	});
});
QUnit.module("ejbStateless");
if(ejbStateless !== undefined) {
	QUnit.test(".testGetDate() with QOS", function (assert) {
		var r1, r2, done = assert.async(), timer = setTimeout(checkResult, 4000);
		var checkResult = function() {
			if(timer) clearTimeout(timer);
			assert.equal(r1, r2);
			done();
		};
		ejbStateless.getDate().event(function (evt) {
			r1 = evt.response;
			assert.equal(evt.type, "RESULT", "r1 = "+new Date(r1).toString());
			if(r2) checkResult();
		});
		ejbStateless.getDate().event(function (evt) {
			r2 = evt.response;
			assert.equal(evt.type, "RESULT", "r2 = "+new Date(r2).toString());
			if(r1) checkResult();
		});
	});
	QUnit.test(".testGetCDIPrincipalName()", function (assert) {
		var login, done = assert.async(), resultCount = 0, okCount = 0, timer = setTimeout(checkResult, 4000);
		var checkResult = function() {
			if(timer) clearTimeout(timer);
			assert.equal(okCount, 50, "50 response with login = "+login);
			done();
		};
		ejbStateless.getCDIPrincipalName().event(function (evt) {
			login = evt.response;
			assert.notEqual(login, "ANONYMOUS", "login should be different to ANONYMOUS and was "+login);
			var getName = function () {
				ejbStateless.getCDIPrincipalName().event(function (evt) {
					if (evt.response === login) okCount++;
					resultCount++;
					if (resultCount < 50) getName();
					else checkResult();
				});
			};
			getName();
		});
	});
	QUnit.test(".testIsUserInRoleTrue()", function (assert) {
		var done = assert.async();
		ejbStateless.isUserInRole("USERR").event(function (evt) {
			assert.equal(evt.type, "RESULT", "User should be in role : USERR");
			assert.equal(evt.response, true);
			done();
		});
	});
	QUnit.test(".testIsUserInRoleFalse()", function (assert) {
		var done = assert.async();
		ejbStateless.isUserInRole("ADMINR").event(function (evt) {
			assert.equal(evt.type, "RESULT");
			assert.equal(evt.response, false);
			done();
		});
	});
	QUnit.test(".testTimeout()", function (assert) {
		var done = assert.async();
		ejbStateless.getDate().timeout(1000).event(function (evt) {
			assert.equal(evt.type, "FAULT", evt.response.message);
			done();
		});
	});
	QUnit.test(".callAuthorized()", function (assert) {
		var done = assert.async();
		ejbStateless.callAuthorized().event(function (evt) {
			assert.equal(evt.type, "RESULT");
			done();
		});
	});
	QUnit.test(".callUnauthorized()", function (assert) {
		var done = assert.async();
		ejbStateless.callUnauthorized().event(function (evt) {
			assert.equal(evt.type, "FAULT");
			done();
		});
	});
}
QUnit.module("ocelotServices");
QUnit.test(".setLocale()", function (assert) {
	var done = assert.async(), func;
	func = function (evt) {
		ocelotController.cacheManager.removeEventListener("remove", func);
		ocelotServices.getLocale().event(function (evt) {
			assert.equal(evt.type, "RESULT", "Locale from server "+evt.response);
			ocelotServices.setLocale({"language": "fr", "country": "FR"}).event(function (evt) {
				assert.equal(evt.type, "RESULT");
				if(evt.type === "RESULT") {
					ocelotServices.getLocale().event(function (evt) {
						assert.equal(evt.type, "RESULT");
						if(evt.type === "RESULT") {
							assert.equal(evt.response.language, "fr", "Language was "+evt.response.language);
							assert.equal(evt.response.country, "FR", "Country was "+evt.response.country);
						}
						done();
					});
				} else done();
			});
		});
	};
	ocelotController.cacheManager.addEventListener("remove", func);
	ocelotServices.setLocale({"language": "en", "country": "US"}).event(function (evt) {
		assert.equal(evt.type, "RESULT");
	});
});
QUnit.module("springPrototypeBean");
QUnit.test(".getCount()", function (assert) {
	var result = 0, nb = 10, num = 0, done = assert.async(), 
	timer = setTimeout(checkResult, 2000),
	checkResult = function() {
		if(timer) clearTimeout(timer);
		assert.equal(result, 0, "Result prototype is stateless, don't store result getCount = "+result);
		done();
	},
	getCount = function() {
		springPrototypeBean.getCount().event(function (evt) {
			assert.equal(evt.type, "RESULT");
			result += evt.response;
			if(num<nb) {
				num++;
				getCount();
			} else checkResult();
		});
	};
	getCount();
});
QUnit.test(".getCountFromSingletonAutoWired()", function (assert) {
	var result = 0, nb = 10, num = 0, done = assert.async(), 
	timer = setTimeout(checkResult, 2000),
	expected = ((nb+1) * nb)/2,
	checkResult = function() {
		if(timer) clearTimeout(timer);
		assert.ok(result === expected, "Result singleton is never reset "+result+" == "+expected);
		done();
	},
	getCount = function() {
		springPrototypeBean.getCountFromSingleton().event(function (evt) {
			assert.equal(evt.type, "RESULT");
			result += evt.response;
			if(num<nb) {
				num++;
				getCount();
			} else checkResult();
		});
	};
	springPrototypeBean.initSingleton().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		getCount();
	});
});
QUnit.module("springSessionBean");
QUnit.test(".getCount()", function (assert) {
	var result = 0, nb = 10, num = 0, done = assert.async(), 
	timer = setTimeout(checkResult, 2000),
	expected = ((nb+1) * nb)/2,
	checkResult = function() {
		if(timer) clearTimeout(timer);
		assert.ok(result > expected, "Result session is bounded to client : result : "+result+" - expected : "+expected);
		done();
	},
	getCount = function() {
		springSessionBean.getCount().event(function (evt) {
			assert.equal(evt.type, "RESULT");
			result += evt.response;
			if(num<nb) {
				num++;
				getCount();
			} else checkResult();
		});
	};
	springSessionBean.getCount().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		getCount();
	});
});
QUnit.module("springSingletonBean");
QUnit.test(".getCount()", function (assert) {
	var result = 0, nb = 10, num = 0, done = assert.async(), 
	timer = setTimeout(checkResult, 2000),
	expected = ((nb+1) * nb)/2,
	checkResult = function() {
		if(timer) clearTimeout(timer);
		assert.ok(result > expected, "Result singleton is never reset "+result+" > "+expected);
		done();
	},
	getCount = function() {
		springSingletonBean.getCount().event(function (evt) {
			assert.equal(evt.type, "RESULT");
			result += evt.response;
			if(num<nb) {
				num++;
				getCount();
			} else checkResult();
		});
	};
	springSingletonBean.getCount().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		getCount();
	});
});

function S4() {
	 return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
// generate an unique ident
function getGuid() {
	return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}
var unreachableServices = (function () {
	'use strict';
	var _ds="org.ocelotds.ocelot.UnreachableServices";
	return{
		getVoid: function () {
			return promiseFactory.create(_ds, "781c53ed36c8e09e518531b803fba95f", "getVoid", false, [], []);
		}
	};
})();
